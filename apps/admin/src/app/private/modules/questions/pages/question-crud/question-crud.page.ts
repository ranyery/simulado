import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {
  EQuestionDifficultyLevel,
  EQuestionStatus,
  EQuestionType,
  IQuestion,
} from '@libs/shared/domain';

import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';
import { ToastService } from '../../../../../shared/services/toast.service';
import { UserRolesService } from '../../../../../shared/services/user-roles.service';
import { UtilsService } from '../../../../../shared/services/utils.service';
import { InstitutesState } from '../../../institutes/state/institutes.state';
import { SubjectsState } from '../../../subjects/state/subjects.state';
import { TopicsState } from '../../../topics/state/topics.state';
import { QuestionsService } from '../../services/questions.service';
import { QuestionsState } from '../../state/questions.state';
import { EQuestionActions } from '../question-list/question-list.page';

interface IQuestionStatus {
  name: string;
  code: EQuestionStatus;
}

interface IQuestionType {
  name: string;
  code: EQuestionType;
}

interface IQuestionDifficultyLevel {
  name: string;
  code: EQuestionDifficultyLevel;
}

interface IOption {
  name: string;
  code: string;
}

@Component({
  selector: 'app-question-crud',
  templateUrl: './question-crud.page.html',
  styleUrls: ['./question-crud.page.scss'],
})
export class QuestionCrudPage implements OnInit {
  private readonly _router = inject(Router);
  private readonly _location = inject(Location);
  private readonly _activatedRoute = inject(ActivatedRoute);

  private readonly _utilsService = inject(UtilsService);
  private readonly _toastService = inject(ToastService);
  private readonly _confirmDialogService = inject(ConfirmDialogService);

  private readonly _userRolesService = inject(UserRolesService);
  private readonly _questionsService = inject(QuestionsService);

  private readonly _topicsState = inject(TopicsState);
  private readonly _subjectsState = inject(SubjectsState);
  private readonly _questionsState = inject(QuestionsState);
  private readonly _institutesState = inject(InstitutesState);

  public question?: IQuestion;
  private _questionState!: IQuestion;
  private _actionType = EQuestionActions.CREATE;

  public readonly upperLetters: string[] = ['A', 'B', 'C', 'D', 'E'];

  public readonly questionTypes: IQuestionType[] = [
    { name: 'Múltipla Escolha', code: EQuestionType.MULTIPLE_CHOICE },
    { name: 'Preenchimento de Espaços em Branco', code: EQuestionType.FILL_IN_THE_BLANK },
    { name: 'Verdadeiro ou Falso', code: EQuestionType.TRUE_OR_FALSE },
  ];

  public readonly questionDifficultyLevels: IQuestionDifficultyLevel[] = [
    { name: 'Fácil', code: EQuestionDifficultyLevel.EASY },
    { name: 'Médio', code: EQuestionDifficultyLevel.MEDIUM },
    { name: 'Difícil', code: EQuestionDifficultyLevel.HARD },
  ];

  public readonly questionStatus: IQuestionStatus[] = [
    { name: 'Revisão pendente', code: EQuestionStatus.PENDING_REVIEW },
    { name: 'Ativo', code: EQuestionStatus.ACTIVE },
    { name: 'Arquivado', code: EQuestionStatus.ARCHIVED },
  ];

  public subjectOptions: IOption[] = this._subjectsState
    .getAll()
    .map<IOption>((subject) => ({ name: subject.name, code: subject.id }));

  public instituteOptions: IOption[] = this._institutesState
    .getAll()
    .map<IOption>((institute) => ({ name: institute.acronym, code: institute.id }));

  public relatedTopicOptions: IOption[] = this._topicsState
    .getAll()
    .map<IOption>((topic) => ({ name: topic.name, code: topic.id }));

  public formQuestion = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    statement: new FormControl<string>('', [Validators.required]),
    answerOptions: new FormArray(
      Array(5)
        .fill(null)
        .map(() => new FormControl<string | undefined>(undefined, [Validators.required]))
    ),
    rightAnswer: new FormControl<number | undefined>(undefined, Validators.required),
    explanation: new FormControl<string | undefined>(undefined),
    type: new FormControl<IQuestionType | undefined>(
      {
        value: this.questionTypes.find(
          (question) => question.code === EQuestionType.MULTIPLE_CHOICE
        ),
        disabled: true,
      },
      [Validators.required]
    ),
    instituteId: new FormControl<IOption | undefined>(undefined, [Validators.required]),
    year: new FormControl<number | undefined>(undefined, [
      Validators.min(0),
      Validators.max(new Date().getFullYear()),
    ]),
    difficultyLevel: new FormControl<IQuestionDifficultyLevel | undefined>(
      {
        value: this.questionDifficultyLevels.find((q) => q.code === EQuestionDifficultyLevel.EASY),
        disabled: false,
      },
      [Validators.required]
    ),
    subjectId: new FormControl<IOption | undefined>(undefined, [Validators.required]),
    relatedTopicIds: new FormControl<IOption[] | undefined>(undefined, [Validators.required]),
    status: new FormControl<IQuestionStatus | undefined>(
      {
        value: this.questionStatus.find((q) => q.code === EQuestionStatus.PENDING_REVIEW),
        disabled: !this._userRolesService.isAdmin(),
      },
      [Validators.required]
    ),
  });

  public editorConfig: AngularEditorConfig = {
    editable: true,
    height: '150px',
    sanitize: false,
    defaultParagraphSeparator: 'p',
    placeholder: 'Preencha o enunciado da questão...',
    // uploadUrl: 'v1/image',
    // upload: (file: File) => { ... }
    toolbarHiddenButtons: [
      ['heading', 'fontName'],
      ['fontSize', 'customClasses', 'insertHorizontalRule'],
    ],
    rawPaste: true,
  };

  constructor() {
    const state = this._router.getCurrentNavigation()?.extras.state;
    const questionId = this._activatedRoute.snapshot.params['id'];

    if (state) {
      this._questionState = state['question'];
      this._actionType = EQuestionActions.UPDATE;
    }

    if (questionId && !this._questionState) {
      // update url without navigation
      this._location.replaceState('cockpit/questions/crud');
    }
  }

  ngOnInit(): void {
    this.formQuestion.valueChanges.subscribe(() => {
      this.question = this._composeQuestionFromFormValues();
    });

    if (this._actionType === EQuestionActions.CREATE) {
      this.formQuestion.controls['instituteId'].setValue(this.instituteOptions[0]);
      this.formQuestion.controls['subjectId'].setValue(this.subjectOptions[0]);
      return;
    }

    if (this._actionType === EQuestionActions.UPDATE) {
      const questionType = this.questionTypes.find((q) => q.code === this._questionState.type);
      const questionDifficultyLevel = this.questionDifficultyLevels.find(
        (d) => d.code === this._questionState.difficultyLevel
      );
      const questionStatus = this.questionStatus.find((s) => s.code === this._questionState.status);
      const selectedSubject = this.subjectOptions.find(
        (s) => s.code === this._questionState.subjectId
      );
      // const selectedSubjectIds = this.relatedTopicOptions.filter((t) =>
      //   this._questionState.relatedTopicIds.includes(t.code)
      // );
      const selectedInstitute = this.instituteOptions.find(
        (i) => i.code === this._questionState.instituteId
      );

      this.formQuestion.controls['id'].setValue(this._questionState.id);
      this.formQuestion.controls['statement'].setValue(this._questionState.statement);
      this.formQuestion.controls['explanation'].setValue(this._questionState.explanation);
      this.formQuestion.controls['type'].setValue(questionType);
      this.formQuestion.controls['instituteId'].setValue(selectedInstitute);
      this.formQuestion.controls['year'].setValue(this._questionState.year);
      this.formQuestion.controls['difficultyLevel'].setValue(questionDifficultyLevel);
      this.formQuestion.controls['subjectId'].setValue(selectedSubject);
      // this.formQuestion.controls['relatedTopicIds'].setValue(selectedSubjectIds);
      this.formQuestion.controls['status'].setValue(questionStatus);
      this.formQuestion.controls['answerOptions'].setValue(this._questionState.answerOptions);
      this.formQuestion.controls['rightAnswer'].setValue(this._questionState.rightAnswer);
    }
  }

  public setRightAnswer(index: number): void {
    this.formQuestion.controls['rightAnswer'].setValue(index);
  }

  public confirm(): void {
    const question = this._composeQuestionFromFormValues();

    this._confirmDialogService.confirm(
      {
        title: 'Atenção!',
        message: `Deseja confirmar a ${
          this._actionType === EQuestionActions.CREATE ? 'criação' : 'atualização'
        } da questão?`,
        type: 'info',
      },
      () => {
        this._actionType === EQuestionActions.CREATE
          ? this._createQuestion(question)
          : this._updateQuestion(question);
      },
      () => this.cancel()
    );
  }

  public cancel(): void {
    this._router.navigate(['/', 'cockpit', 'questions']);
  }

  private _composeQuestionFromFormValues(): IQuestion {
    const formQuestionValues = this.formQuestion.getRawValue();

    const questionType = formQuestionValues.type?.code;
    const questionStatus = formQuestionValues.status?.code;
    const questionInstituteId = formQuestionValues.instituteId?.code;
    const questionSubjectId = formQuestionValues.subjectId?.code;
    const questionDifficultyLevel = formQuestionValues.difficultyLevel?.code;
    const questionRelatedTopicIds = formQuestionValues.relatedTopicIds?.map((topic) => topic.code);

    const updatedQuestion = this._utilsService.removeNullOrUndefinedOrEmptyProperties<IQuestion>({
      ...(this._questionState ?? {}),
      ...formQuestionValues,
      instituteId: questionInstituteId,
      subjectId: questionSubjectId,
      relatedTopicIds: questionRelatedTopicIds ?? [],
      type: questionType ?? EQuestionType.MULTIPLE_CHOICE,
      status: questionStatus ?? EQuestionStatus.PENDING_REVIEW,
      difficultyLevel: questionDifficultyLevel ?? EQuestionDifficultyLevel.MEDIUM,
    });

    return updatedQuestion;
  }

  private _createQuestion(question: IQuestion): void {
    this._questionsService.create(question).subscribe({
      next: (question) => {
        this._questionsState.add(question);
        this._toastService.open({ type: 'success', message: 'Questão criada com sucesso.' });
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this._toastService.open({
          type: 'error',
          message: 'Erro ao tentar criar uma nova questão. Verifique os detalhes no console.',
        });
      },
    });
  }

  private _updateQuestion(question: IQuestion): void {
    this._questionsService.updateById(question).subscribe({
      next: (question) => {
        this._questionsState.update(question);
        this._toastService.open({ type: 'success', message: 'Questão atualizada com sucesso.' });
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this._toastService.open({
          type: 'error',
          message: 'Erro ao tentar atualizar a questão. Verifique os detalhes no console.',
        });
      },
    });
  }
}
