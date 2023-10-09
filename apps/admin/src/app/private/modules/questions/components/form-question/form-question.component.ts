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
import { SubjectsState } from '../../../subjects/state/subjects.state';
import { TopicsState } from '../../../topics/state/topics.state';
import { EQuestionActions } from '../../page/questions.page';

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

interface ISubjectOption {
  name: string;
  code: string;
}

interface IRelatedTopicOption {
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

  public subjectOptions: ISubjectOption[] = [];
  public relatedTopicOptions: IRelatedTopicOption[] = [];

  public formQuestion = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    statement: new FormControl<string>('', Validators.required),
    answerOptions: new FormArray<FormGroup>([]),
    explanation: new FormControl<string | undefined>(undefined),
    type: new FormControl<IQuestionType | string | undefined>({
      value: this.questionTypes.find((question) => question.name === EQuestionType.MULTIPLE_CHOICE),
      disabled: true,
    }),
    examId: new FormControl<string>('', [Validators.required]),
    year: new FormControl<number | undefined>(undefined),
    difficultyLevel: new FormControl<IQuestionDifficultyLevel | undefined>({
      value: this.questionDifficultyLevels.find((q) => q.name === EQuestionDifficultyLevel.MEDIUM),
      disabled: false,
    }),
    subjectId: new FormControl<ISubjectOption | undefined>(undefined),
    relatedTopicIds: new FormControl<IRelatedTopicOption[]>([]),
    status: new FormControl<IQuestionStatus | undefined>({
      value: this.questionStatus.find((q) => q.name === EQuestionStatus.PENDING_REVIEW),
      disabled: !this._userRolesService.isAdmin(),
    }),
  });

  constructor() {}

  ngOnInit(): void {
    const { actionType, question } = this._dynamicDialogConfig.data as IQuestionActionData;

    this.subjectOptions = this._subjectsState
      .getAll()
      .map<ISubjectOption>((subject) => ({ name: subject.name, code: subject.id }));

    this.relatedTopicOptions = this._topicsState
      .getAll()
      .map<IRelatedTopicOption>((topic) => ({ name: topic.name, code: topic.id }));

    this._actionType = actionType;

    if (actionType === EQuestionActions.CREATE) {
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

      this.formQuestion.controls['id'].setValue(question.id);
      this.formQuestion.controls['statement'].setValue(question.statement);
      this.formQuestion.controls['explanation'].setValue(question.explanation);
      this.formQuestion.controls['type'].setValue(questionType);
      this.formQuestion.controls['examId'].setValue(question.examId);
      this.formQuestion.controls['year'].setValue(question.year);
      this.formQuestion.controls['difficultyLevel'].setValue(questionDifficultyLevel);
      this.formQuestion.controls['subjectId'].setValue(selectedSubject);
      this.formQuestion.controls['relatedTopicIds'].setValue(selectedSubjectIds);
      this.formQuestion.controls['status'].setValue(questionStatus);

      question.answerOptions.forEach((option) => {
        const formGroup = new FormGroup({
          text: new FormControl<string>(option.text, Validators.required),
          isCorrect: new FormControl<boolean>(option.isCorrect),
        });

        this.formQuestion.controls['answerOptions'].push(formGroup);
      });
    }
  }

  public confirm(): void {
    const formQuestionValues = this.formQuestion.value;
    const { question } = this._dynamicDialogConfig.data as IQuestionActionData;

    const questionId = question.id;
    const questionStatus = formQuestionValues.status?.code ?? EQuestionStatus.PENDING_REVIEW;

    const updatedQuestion = this._utilsService.removeNullOrUndefinedOrEmptyProperties<IQuestion>({
      ...question,
      ...formQuestionValues,
      id: questionId,
      status: questionStatus,
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
