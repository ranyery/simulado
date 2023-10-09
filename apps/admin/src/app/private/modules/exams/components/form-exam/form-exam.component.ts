import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EExamStatus, IExam } from '@libs/shared/domain';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';
import { UserRolesService } from '../../../../../shared/services/user-roles.service';
import { UtilsService } from '../../../../../shared/services/utils.service';
import { EExamActions } from '../../page/exams.page';

interface IExamStatus {
  name: string;
  code: EExamStatus;
}

interface IExamActionData {
  actionType: EExamActions;
  exam: IExam;
}

@Component({
  selector: 'app-form-exam',
  templateUrl: './form-exam.component.html',
  styleUrls: ['./form-exam.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormExamComponent implements OnInit {
  private readonly _dynamicDialogRef = inject(DynamicDialogRef);
  private readonly _dynamicDialogConfig = inject(DynamicDialogConfig);
  private readonly _confirmDialogService = inject(ConfirmDialogService);
  private readonly _utilsService = inject(UtilsService);
  private readonly _userRolesService = inject(UserRolesService);

  private _actionType?: EExamActions;

  public readonly examStatus: IExamStatus[] = [
    { name: 'Revisão pendente', code: EExamStatus.PENDING_REVIEW },
    { name: 'Ativo', code: EExamStatus.ACTIVE },
    { name: 'Arquivado', code: EExamStatus.ARCHIVED },
  ];

  public form = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    acronym: new FormControl<string>('', [Validators.required]),
    name: new FormControl<string | undefined>(''),
    status: new FormControl<IExamStatus | undefined>({
      value: this.examStatus.find((exam) => exam.name === EExamStatus.PENDING_REVIEW),
      disabled: !this._userRolesService.isAdmin(),
    }),
  });

  constructor() {}

  ngOnInit(): void {
    const { actionType, exam } = this._dynamicDialogConfig.data as IExamActionData;
    this._actionType = actionType;

    if (actionType === EExamActions.CREATE) {
      return;
    }

    if (actionType === EExamActions.UPDATE) {
      const examStatus = this.examStatus.find((s) => s.code === exam.status);

      this.form.controls['id'].setValue(exam.id);
      this.form.controls['acronym'].setValue(exam.acronym);
      this.form.controls['name'].setValue(exam.name);
      this.form.controls['status'].setValue(examStatus);
    }
  }

  public confirm(): void {
    const formExamValues = this.form.value;
    const { exam } = this._dynamicDialogConfig.data as IExamActionData;

    const examId = exam.id;
    const examStatus = formExamValues.status?.code ?? EExamStatus.PENDING_REVIEW;

    const updatedExam = this._utilsService.removeNullOrUndefinedOrEmptyProperties<IExam>({
      ...exam,
      ...formExamValues,
      id: examId,
      status: examStatus,
    });

    this._confirmDialogService.confirm(
      {
        title: 'Atenção!',
        message: `Deseja confirmar a ${
          this._actionType === EExamActions.CREATE ? 'criação' : 'atualização'
        } do exame <b>${updatedExam.acronym}</b>?`,
        type: 'info',
      },
      () => this._dynamicDialogRef.close({ exam: updatedExam }),
      () => this.cancel()
    );
  }

  public cancel(): void {
    this._dynamicDialogRef.destroy();
  }
}
