import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ESubjectStatus, ISubject } from '@libs/shared/domain';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

interface ISubjectStatus {
  name: string;
  code: ESubjectStatus;
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

  private _subjectState?: ISubject;
  private _operationType: string = 'UPDATE';

  public readonly subjectStatus: ISubjectStatus[] = [
    { name: 'Pendente para revisão', code: ESubjectStatus.PENDING_REVIEW },
    { name: 'Ativo', code: ESubjectStatus.ACTIVE },
    { name: 'Arquivado', code: ESubjectStatus.ARCHIVED },
  ];

  public form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string | undefined>(undefined),
    status: new FormControl<ISubjectStatus | undefined>(undefined),
  });

  constructor() {}

  ngOnInit(): void {
    const { subject } = this._dynamicDialogConfig.data;

    if (!subject) {
      this._operationType = 'CREATE';
      return;
    }

    this._subjectState = subject as ISubject;
    const subjectStatus = this.subjectStatus.find((s) => s.code === subject?.status);
    this.form.controls['name'].setValue(subject.name, { emitEvent: false });
    this.form.controls['status'].setValue(subjectStatus, { emitEvent: false });
    this.form.controls['description'].setValue(subject.description, { emitEvent: false });
  }

  public confirm(): void {
    const subjectRawValues = this.form.getRawValue();
    const subjectId = this._subjectState?.id ?? undefined;
    const subjectStatus = this.form.controls['status'].value?.code ?? ESubjectStatus.PENDING_REVIEW;

    const subject = {
      ...subjectRawValues,
      id: subjectId,
      status: subjectStatus,
    } as ISubject;

    this._dynamicDialogRef.close({ type: this._operationType, subject: subject });
  }

  public cancel(): void {
    this._dynamicDialogRef.destroy();
  }
}
