import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EQuestionStatus, IQuestion } from '@libs/shared/domain';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';
import { UserRolesService } from '../../../../../shared/services/user-roles.service';
import { UtilsService } from '../../../../../shared/services/utils.service';
import { EQuestionActions } from '../../page/questions.page';

interface IQuestionStatus {
  name: string;
  code: EQuestionStatus;
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

  private _actionType?: EQuestionActions;

  public readonly questionStatus: IQuestionStatus[] = [
    { name: 'Revisão pendente', code: EQuestionStatus.PENDING_REVIEW },
    { name: 'Ativo', code: EQuestionStatus.ACTIVE },
    { name: 'Arquivado', code: EQuestionStatus.ARCHIVED },
  ];

  public form = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    name: new FormControl<string>('', [Validators.required]),
    status: new FormControl<IQuestionStatus | undefined>({
      value: this.questionStatus.find(
        (question) => question.name === EQuestionStatus.PENDING_REVIEW
      ),
      disabled: !this._userRolesService.isAdmin(),
    }),
    description: new FormControl<string | undefined>(undefined),
  });

  constructor() {}

  ngOnInit(): void {
    const { actionType, question } = this._dynamicDialogConfig.data as IQuestionActionData;
    this._actionType = actionType;

    if (actionType === EQuestionActions.CREATE) {
      return;
    }

    if (actionType === EQuestionActions.UPDATE) {
      const questionStatus = this.questionStatus.find((s) => s.code === question.status);

      this.form.controls['id'].setValue(question.id, { emitEvent: false });
      // this.form.controls['name'].setValue(question.name, { emitEvent: false });
      this.form.controls['status'].setValue(questionStatus, { emitEvent: false });
      // this.form.controls['description'].setValue(question.description, { emitEvent: false });
    }
  }

  public confirm(): void {
    const formQuestionValues = this.form.value;
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
