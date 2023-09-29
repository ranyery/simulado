import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ESubjectStatus, ISubject } from '@libs/shared/domain';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';
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

  public readonly subjectStatus: ISubjectStatus[] = [
    { name: 'Revisão pendente', code: ESubjectStatus.PENDING_REVIEW },
    { name: 'Ativo', code: ESubjectStatus.ACTIVE },
    { name: 'Arquivado', code: ESubjectStatus.ARCHIVED },
  ];

  public form = new FormGroup({
    id: new FormControl<string>('', [Validators.required]),
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string | undefined>(undefined),
    status: new FormControl<ISubjectStatus | undefined>(undefined, [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {
    const { actionType, subject } = this._dynamicDialogConfig.data as ISubjectActionData;

    if (actionType === ESubjectActions.CREATE) {
      return;
    }

    if (actionType === ESubjectActions.UPDATE) {
      const subjectStatus = this.subjectStatus.find((s) => s.code === subject.status);

      this.form.controls['id'].setValue(subject.id, { emitEvent: false });
      this.form.controls['name'].setValue(subject.name, { emitEvent: false });
      this.form.controls['status'].setValue(subjectStatus, { emitEvent: false });
      this.form.controls['description'].setValue(subject.description, { emitEvent: false });
    }
  }

  public confirm(): void {
    const formSubjectValues = this.form.value;
    const { subject } = this._dynamicDialogConfig.data as ISubjectActionData;

    const subjectId = subject.id ?? undefined;
    const subjectStatus = formSubjectValues.status?.code ?? ESubjectStatus.PENDING_REVIEW;

    const updatedSubject = {
      ...subject,
      ...formSubjectValues,
      id: subjectId,
      status: subjectStatus,
    } as ISubject;

    this._confirmDialogService.confirm(
      {
        title: 'Atenção!',
        message: `Deseja confirmar a criação da matéria <b>${updatedSubject.name}</b>?`,
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
