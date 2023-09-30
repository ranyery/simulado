import { Clipboard } from '@angular/cdk/clipboard';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { EEntity, ESubjectStatus, ISubject } from '@libs/shared/domain';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { finalize, switchMap } from 'rxjs';

import { AuthService } from '../../../../shared/services/auth.service';
import { ConfirmDialogService } from '../../../../shared/services/confirm-dialog.service';
import { PermissionsService } from '../../../../shared/services/permissions.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { FormSubjectComponent } from '../components/form-subject/form-subject.component';
import { SubjectsService } from '../services/subjects.service';
import { SubjectsState } from '../state/subjects.state';

export const enum ESubjectActions {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
})
export class SubjectsPage implements OnInit {
  private _dynamicDialogRef = inject(DynamicDialogRef);
  private readonly _dialogService = inject(DialogService);
  private readonly _subjectsService = inject(SubjectsService);
  private readonly _subjectsState = inject(SubjectsState);
  private readonly _toastService = inject(ToastService);
  private readonly _confirmDialogService = inject(ConfirmDialogService);
  private readonly _permissionsService = inject(PermissionsService);
  private readonly _authService = inject(AuthService);
  private readonly _clipboard = inject(Clipboard);

  @ViewChild('pTable')
  private readonly _pTable?: Table;

  public subjects: ISubject[] = [];
  public isLoading: boolean = true;
  public hasError: boolean = false;

  public canRead: boolean = false;
  public canCreate: boolean = false;
  public canUpdate: boolean = false;
  public canDelete: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.canRead = this._permissionsService.canRead(EEntity.SUBJECTS);

    if (!this.canRead) {
      this._authService.logout();
      return;
    }

    this.canCreate = this._permissionsService.canCreate(EEntity.SUBJECTS);
    this.canUpdate = this._permissionsService.canUpdate(EEntity.SUBJECTS);
    this.canDelete = this._permissionsService.canDelete(EEntity.SUBJECTS);

    this._fetchAllSubjects();
  }

  private _fetchAllSubjects(): void {
    if (!this._subjectsState.isEmpty()) {
      this.subjects = this._subjectsState.get();
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.hasError = false;

    this._subjectsService
      .getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (subjects) => {
          this.subjects = subjects;
          this._subjectsState.set(subjects);
          this.hasError = false;
        },
        error: () => (this.hasError = true),
      });
  }

  public createSubject(): void {
    this._dynamicDialogRef = this._dialogService.open(FormSubjectComponent, {
      data: { actionType: ESubjectActions.CREATE, subject: {} },
      closable: false,
    });

    this._dynamicDialogRef.onClose
      .pipe(switchMap(({ subject }) => this._subjectsService.create(subject)))
      .subscribe({
        next: (data) => {
          this.subjects = [...this.subjects, data];
          this._subjectsState.set(this.subjects);
          this._toastService.open({ type: 'success', message: 'Matéria criada com sucesso.' });
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this._toastService.open({
            type: 'error',
            message: 'Erro ao tentar criar uma nova matéria. Verifique os detalhes no console.',
          });
        },
      });
  }

  public updateSubject(subject: ISubject): void {
    this._dynamicDialogRef = this._dialogService.open(FormSubjectComponent, {
      data: { actionType: ESubjectActions.UPDATE, subject },
      closable: false,
    });

    this._dynamicDialogRef.onClose
      .pipe(switchMap(({ subject }) => this._subjectsService.updateById(subject)))
      .subscribe({
        next: (subject) => {
          this.subjects = this.subjects.map((sub) => {
            if (sub.id !== subject.id) return sub;
            return { ...sub, ...subject };
          });
          this._subjectsState.set(this.subjects);

          this._toastService.open({ type: 'success', message: 'Matéria atualizada com sucesso.' });
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this._toastService.open({
            type: 'error',
            message: 'Erro ao tentar atualizar a matéria. Verifique os detalhes no console.',
          });
        },
      });
  }

  public archiveSubject(subject: ISubject): void {
    this._confirmDialogService.confirm(
      { title: 'Atenção!', message: `Deseja arquivar a matéria <b>${subject.name}</b>?` },
      () => this._archiveSubjectById(subject)
    );
  }

  public copyToClipboard(value: string): void {
    this._clipboard.copy(value);
    this._toastService.close();
    this._toastService.open({ type: 'info', message: 'Id copiado para a área de transferência.' });
  }

  private _archiveSubjectById(subject: ISubject): void {
    this._subjectsService.deleteById(subject.id).subscribe({
      next: () => {
        this.subjects = this.subjects.map((sub) => {
          if (sub.id !== subject.id) return sub;
          return { ...sub, status: ESubjectStatus.ARCHIVED };
        });
        this._subjectsState.set(this.subjects);

        this._toastService.open({ type: 'success', message: 'Matéria arquivada com sucesso.' });
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this._toastService.open({
          type: 'error',
          message: 'Erro ao tentar arquivar a matéria. Verifique os detalhes no console.',
        });
      },
    });
  }

  public clearFilterTable(): void {
    this._pTable?.clear();
  }

  public applyFilterGlobal($event: any, value: string): void {
    this._pTable?.filterGlobal(($event.target as HTMLInputElement).value, value);
  }
}
