import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EInstituteStatus, IInstitute } from '@libs/shared/domain';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';
import { UserRolesService } from '../../../../../shared/services/user-roles.service';
import { UtilsService } from '../../../../../shared/services/utils.service';
import { EInstituteActions } from '../../page/institutes.page';

interface IInstituteStatus {
  name: string;
  code: EInstituteStatus;
}

interface IInstituteActionData {
  actionType: EInstituteActions;
  institute: IInstitute;
}

@Component({
  selector: 'app-form-institute',
  templateUrl: './form-institute.component.html',
  styleUrls: ['./form-institute.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInstituteComponent implements OnInit {
  private readonly _dynamicDialogRef = inject(DynamicDialogRef);
  private readonly _dynamicDialogConfig = inject(DynamicDialogConfig);
  private readonly _confirmDialogService = inject(ConfirmDialogService);
  private readonly _utilsService = inject(UtilsService);
  private readonly _userRolesService = inject(UserRolesService);

  private _actionType?: EInstituteActions;

  public readonly instituteStatus: IInstituteStatus[] = [
    { name: 'Revisão pendente', code: EInstituteStatus.PENDING_REVIEW },
    { name: 'Ativo', code: EInstituteStatus.ACTIVE },
    { name: 'Arquivado', code: EInstituteStatus.ARCHIVED },
  ];

  public form = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    acronym: new FormControl<string>('', [Validators.required]),
    name: new FormControl<string | undefined>(''),
    status: new FormControl<IInstituteStatus | undefined>({
      value: this.instituteStatus.find(
        (institute) => institute.name === EInstituteStatus.PENDING_REVIEW
      ),
      disabled: !this._userRolesService.isAdmin(),
    }),
  });

  constructor() {}

  ngOnInit(): void {
    const { actionType, institute } = this._dynamicDialogConfig.data as IInstituteActionData;
    this._actionType = actionType;

    if (actionType === EInstituteActions.CREATE) {
      return;
    }

    if (actionType === EInstituteActions.UPDATE) {
      const instituteStatus = this.instituteStatus.find((s) => s.code === institute.status);

      this.form.controls['id'].setValue(institute.id);
      this.form.controls['acronym'].setValue(institute.acronym);
      this.form.controls['name'].setValue(institute.name);
      this.form.controls['status'].setValue(instituteStatus);
    }
  }

  public confirm(): void {
    const formInstituteValues = this.form.value;
    const { institute } = this._dynamicDialogConfig.data as IInstituteActionData;

    const instituteId = institute.id;
    const instituteStatus = formInstituteValues.status?.code ?? EInstituteStatus.PENDING_REVIEW;

    const updatedInstitute = this._utilsService.removeNullOrUndefinedOrEmptyProperties<IInstitute>({
      ...institute,
      ...formInstituteValues,
      id: instituteId,
      status: instituteStatus,
    });

    this._confirmDialogService.confirm(
      {
        title: 'Atenção!',
        message: `Deseja confirmar a ${
          this._actionType === EInstituteActions.CREATE ? 'criação' : 'atualização'
        } do instituto <b>${updatedInstitute.acronym}</b>?`,
        type: 'info',
      },
      () => this._dynamicDialogRef.close({ institute: updatedInstitute }),
      () => this.cancel()
    );
  }

  public cancel(): void {
    this._dynamicDialogRef.destroy();
  }
}
