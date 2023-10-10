import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  EQuestionDifficultyLevel,
  EQuestionStatus,
  EQuestionType,
  IQuestion,
} from '@libs/shared/domain';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';
import { UserRolesService } from '../../../../../shared/services/user-roles.service';
import { UtilsService } from '../../../../../shared/services/utils.service';
import { InstitutesState } from '../../../institutes/state/institutes.state';
import { SubjectsState } from '../../../subjects/state/subjects.state';
import { TopicsState } from '../../../topics/state/topics.state';
import { EQuestionActions } from '../../pages/question-list/question-list.page';

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

interface IQuestionActionData {
  actionType: EQuestionActions;
  question: IQuestion;
}

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormQuestionComponent implements OnInit {
  private readonly _dynamicDialogRef = inject(DynamicDialogRef);
  private readonly _dynamicDialogConfig = inject(DynamicDialogConfig);
  private readonly _confirmDialogService = inject(ConfirmDialogService);
  private readonly _utilsService = inject(UtilsService);
  private readonly _userRolesService = inject(UserRolesService);
  private readonly _subjectsState = inject(SubjectsState);
  private readonly _topicsState = inject(TopicsState);
  private readonly _institutesState = inject(InstitutesState);

  private _actionType?: EQuestionActions;

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

  public subjectOptions: IOption[] = [];
  public relatedTopicOptions: IOption[] = [];
  public instituteOptions: IOption[] = [];
  public readonly upperLetters: string[] = ['A', 'B', 'C', 'D', 'E'];

  public formQuestion = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    statement: new FormControl<string>('', [Validators.required]),
    answerOptions: new FormArray<FormGroup>(
      Array(5)
        .fill(null)
        .map(
          () =>
            new FormGroup({
              text: new FormControl('', [Validators.required]),
              isCorrect: new FormControl(false),
            })
        )
    ),
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
    year: new FormControl<number | undefined>(undefined),
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

  constructor() {}

  ngOnInit(): void {
    const { actionType, question } = this._dynamicDialogConfig.data as IQuestionActionData;
    this._actionType = actionType;

    this.subjectOptions = this._subjectsState
      .getAll()
      .map<IOption>((subject) => ({ name: subject.name, code: subject.id }));

    this.relatedTopicOptions = this._topicsState
      .getAll()
      .map<IOption>((topic) => ({ name: topic.name, code: topic.id }));

    this.instituteOptions = this._institutesState
      .getAll()
      .map<IOption>((institute) => ({ name: institute.acronym, code: institute.id }));

    if (actionType === EQuestionActions.CREATE) {
      this.formQuestion.controls['instituteId'].setValue(this.instituteOptions[0]);
      this.formQuestion.controls['subjectId'].setValue(this.subjectOptions[0]);
      return;
    }

    if (actionType === EQuestionActions.UPDATE) {
      const questionType = this.questionTypes.find((q) => q.code === question.type);
      const questionDifficultyLevel = this.questionDifficultyLevels.find(
        (s) => s.code === question.difficultyLevel
      );
      const questionStatus = this.questionStatus.find((s) => s.code === question.status);
      const selectedSubject = this.subjectOptions.find((s) => s.code === question.subjectId);
      const selectedSubjectIds = this.relatedTopicOptions.filter((topic) =>
        question.relatedTopicIds.includes(topic.code)
      );
      const selectedInstitute = this.instituteOptions.find(
        (institute) => institute.code === question.instituteId
      );

      this.formQuestion.controls['id'].setValue(question.id);
      this.formQuestion.controls['statement'].setValue(question.statement);
      this.formQuestion.controls['explanation'].setValue(question.explanation);
      this.formQuestion.controls['type'].setValue(questionType);
      this.formQuestion.controls['instituteId'].setValue(selectedInstitute);
      this.formQuestion.controls['year'].setValue(question.year);
      this.formQuestion.controls['difficultyLevel'].setValue(questionDifficultyLevel);
      this.formQuestion.controls['subjectId'].setValue(selectedSubject);
      this.formQuestion.controls['relatedTopicIds'].setValue(selectedSubjectIds);
      this.formQuestion.controls['status'].setValue(questionStatus);

      // Necessário limpar caso não seja do tipo 'CREATE'
      this.formQuestion.controls['answerOptions'].clear();
      question.answerOptions.forEach((option) => {
        const formGroup = new FormGroup({
          text: new FormControl<string>(option.text, [Validators.required]),
          isCorrect: new FormControl<boolean>(option.isCorrect),
        });

        this.formQuestion.controls['answerOptions'].push(formGroup);
      });
    }
  }

  public confirm(): void {
    const formQuestionValues = this.formQuestion.getRawValue();
    const { question } = this._dynamicDialogConfig.data as IQuestionActionData;

    const questionType = formQuestionValues.type?.code;
    const questionStatus = formQuestionValues.status?.code;
    const questionInstituteId = formQuestionValues.instituteId?.code;
    const questionSubjectId = formQuestionValues.subjectId?.code;
    const questionDifficultyLevel = formQuestionValues.difficultyLevel?.code;
    const questionRelatedTopicIds = formQuestionValues.relatedTopicIds?.map((topic) => topic.code);

    const updatedQuestion = this._utilsService.removeNullOrUndefinedOrEmptyProperties<IQuestion>({
      ...question,
      ...formQuestionValues,
      id: question.id,
      instituteId: questionInstituteId,
      subjectId: questionSubjectId,
      relatedTopicIds: questionRelatedTopicIds ?? [],
      type: questionType ?? EQuestionType.MULTIPLE_CHOICE,
      status: questionStatus ?? EQuestionStatus.PENDING_REVIEW,
      difficultyLevel: questionDifficultyLevel ?? EQuestionDifficultyLevel.MEDIUM,
    });

    this._confirmDialogService.confirm(
      {
        title: 'Atenção!',
        message: `Deseja confirmar a ${
          this._actionType === EQuestionActions.CREATE ? 'criação' : 'atualização'
        } da questão?`,
        type: 'info',
      },
      () => this._dynamicDialogRef.close({ question: updatedQuestion }),
      () => this.cancel()
    );
  }

  public cancel(): void {
    this._dynamicDialogRef.destroy();
  }
}
