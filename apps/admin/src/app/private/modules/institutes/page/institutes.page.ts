import { Clipboard } from '@angular/cdk/clipboard';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IInstitute } from '@libs/shared/domain';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { finalize, switchMap } from 'rxjs';

import { ConfirmDialogService } from '../../../../shared/services/confirm-dialog.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { FormInstituteComponent } from '../components/form-institute/form-institute.component';
import { InstitutesService } from '../services/institutes.service';
import { InstitutesState } from '../state/institutes.state';

export const enum EInstituteActions {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

@Component({
  selector: 'app-institutes',
  templateUrl: './institutes.page.html',
  styleUrls: ['./institutes.page.scss'],
})
export class InstitutesPage implements OnInit {
  private _dynamicDialogRef = inject(DynamicDialogRef);
  private readonly _dialogService = inject(DialogService);
  private readonly _toastService = inject(ToastService);
  private readonly _confirmDialogService = inject(ConfirmDialogService);

  private readonly _clipboard = inject(Clipboard);

  private readonly _institutesService = inject(InstitutesService);
  private readonly _institutesState = inject(InstitutesState);

  @ViewChild('pTable')
  private readonly _pTable?: Table;

  public institutes: IInstitute[] = [];
  public isLoading: boolean = true;
  public hasError: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this._fetchAllInstitutes();
  }

  private _fetchAllInstitutes(): void {
    if (!this._institutesState.isEmpty()) {
      this.institutes = this._institutesState.getAll();
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.hasError = false;

    this._institutesService
      .getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (institutes) => {
          this.institutes = institutes;
          this._institutesState.set(institutes);
          this.hasError = false;
        },
        error: () => (this.hasError = true),
      });
  }

  public createInstitute(): void {
    this._dynamicDialogRef = this._dialogService.open(FormInstituteComponent, {
      data: { actionType: EInstituteActions.CREATE, institute: {} },
      closable: false,
    });

    this._dynamicDialogRef.onClose
      .pipe(switchMap(({ institute }) => this._institutesService.create(institute)))
      .subscribe({
        next: (data) => {
          this.institutes = [...this.institutes, data];
          this._institutesState.set(this.institutes);
          this._toastService.open({ type: 'success', message: 'Instituto criado com sucesso.' });
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this._toastService.open({
            type: 'error',
            message: 'Erro ao tentar criar um novo instituto. Verifique os detalhes no console.',
          });
        },
      });
  }

  public updateInstitute(institute: IInstitute): void {
    this._dynamicDialogRef = this._dialogService.open(FormInstituteComponent, {
      data: { actionType: EInstituteActions.UPDATE, institute: institute },
      closable: false,
    });

    this._dynamicDialogRef.onClose
      .pipe(switchMap(({ institute }) => this._institutesService.updateById(institute)))
      .subscribe({
        next: (institute) => {
          this.institutes = this.institutes.map((sub) => {
            if (sub.id !== institute.id) return sub;
            return { ...sub, ...institute };
          });
          this._institutesState.set(this.institutes);

          this._toastService.open({
            type: 'success',
            message: 'Instituto atualizado com sucesso.',
          });
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this._toastService.open({
            type: 'error',
            message: 'Erro ao tentar atualizar o instituto. Verifique os detalhes no console.',
          });
        },
      });
  }

  public deleteInstitute(institute: IInstitute): void {
    this._confirmDialogService.confirm(
      { title: 'Atenção!', message: `Deseja excluir o instituto <b>${institute.acronym}</b>?` },
      () => this._deleteInstituteById(institute)
    );
  }

  public copyToClipboard(value: string): void {
    this._clipboard.copy(value);
    this._toastService.open({ type: 'info', message: 'Id copiado para a área de transferência.' });
  }

  private _deleteInstituteById(institute: IInstitute): void {
    this._institutesService.deleteById(institute).subscribe({
      next: () => {
        this.institutes = this.institutes.filter((sub) => sub.id !== institute.id);
        this._institutesState.set(this.institutes);

        this._toastService.open({ type: 'success', message: 'Instituto deletado com sucesso.' });
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this._toastService.open({
          type: 'error',
          message: 'Erro ao tentar deletar o instituto. Verifique os detalhes no console.',
        });
      },
    });
  }

  public clearFilterTable(): void {
    this._pTable?.clear();
  }

  public applyFilterGlobal(event: Event, value: string): void {
    this._pTable?.filterGlobal((event.target as HTMLInputElement).value, value);
  }
}
