import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISubject } from '@libs/shared/domain';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-form-subject',
  templateUrl: './form-subject.component.html',
  styleUrls: ['./form-subject.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSubjectComponent implements OnInit {
  private readonly _dynamicDialogRef = inject(DynamicDialogRef);
  private readonly _dynamicDialogConfig = inject(DynamicDialogConfig);

  private _operationType: string = 'UPDATE';

  public form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string | undefined>(''),
  });

  constructor() {}

  ngOnInit(): void {
    const { subject } = this._dynamicDialogConfig.data;

    if (!subject) {
      this._operationType = 'CREATE';
      return;
    }

    this.form.controls['name'].setValue(subject.name, { emitEvent: false });
    this.form.controls['description'].setValue(subject.description, { emitEvent: false });
  }

  public confirm(): void {
    // TODO: Validar se é necessário adicionar o Id no retorno
    const subject = this.form.getRawValue() as ISubject;
    this._dynamicDialogRef.close({ type: this._operationType, subject });
  }

  public cancel(): void {
    this._dynamicDialogRef.destroy();
  }
}
