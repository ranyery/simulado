import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ESubjectStatus, ISubject } from '@libs/shared/domain';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';
import { UserRolesService } from '../../../../../shared/services/user-roles.service';
import { UtilsService } from '../../../../../shared/services/utils.service';
import { ESubjectActions } from '../../page/subjects.page';

interface ISubjectStatus {
  name: string;
  code: ESubjectStatus;
}

interface ISubjectActionData {
  actionType: ESubjectActions;
  subject: ISubject;
}

@Component({
  selector: 'app-form-subject',
  templateUrl: './form-subject.component.html',
  styleUrls: ['./form-subject.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSubjectComponent implements OnInit {
  private readonly _dynamicDialogRef = inject(DynamicDialogRef);
  private readonly _dynamicDialogConfig = inject(DynamicDialogConfig);
  private readonly _confirmDialogService = inject(ConfirmDialogService);
  private readonly _utilsService = inject(UtilsService);
  private readonly _userRolesService = inject(UserRolesService);

  private _actionType?: ESubjectActions;

  public readonly subjectStatus: ISubjectStatus[] = [
    { name: 'Revisão pendente', code: ESubjectStatus.PENDING_REVIEW },
    { name: 'Ativo', code: ESubjectStatus.ACTIVE },
    { name: 'Arquivado', code: ESubjectStatus.ARCHIVED },
  ];

  public form = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    name: new FormControl<string>('', [Validators.required]),
    status: new FormControl<ISubjectStatus | undefined>({
      value: this.subjectStatus.find((subject) => subject.name === ESubjectStatus.PENDING_REVIEW),
      disabled: !this._userRolesService.isAdmin(),
    }),
    description: new FormControl<string | undefined>(undefined),
  });

  constructor() {}

  ngOnInit(): void {
    const { actionType, subject } = this._dynamicDialogConfig.data as ISubjectActionData;
    this._actionType = actionType;

    if (actionType === ESubjectActions.CREATE) {
      return;
    }

    if (actionType === ESubjectActions.UPDATE) {
      const subjectStatus = this.subjectStatus.find((s) => s.code === subject.status);

      this.form.controls['id'].setValue(subject.id);
      this.form.controls['name'].setValue(subject.name);
      this.form.controls['status'].setValue(subjectStatus);
      this.form.controls['description'].setValue(subject.description);
    }
  }

  public confirm(): void {
    const formSubjectValues = this.form.value;
    const { subject } = this._dynamicDialogConfig.data as ISubjectActionData;

    const subjectStatus = formSubjectValues.status?.code ?? ESubjectStatus.PENDING_REVIEW;

    const updatedSubject = this._utilsService.removeNullOrUndefinedOrEmptyProperties<ISubject>({
      ...subject,
      ...formSubjectValues,
      status: subjectStatus,
    });

    this._confirmDialogService.confirm(
      {
        title: 'Atenção!',
        message: `Deseja confirmar a ${
          this._actionType === ESubjectActions.CREATE ? 'criação' : 'atualização'
        } da matéria <b>${updatedSubject.name}</b>?`,
        type: 'info',
      },
      () => this._dynamicDialogRef.close({ subject: updatedSubject }),
      () => this.cancel()
    );
  }

  public cancel(): void {
    this._dynamicDialogRef.destroy();
  }
}
