import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { EEntity, ISubject } from '@libs/shared/domain';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { finalize, switchMap } from 'rxjs';

import { AuthService } from '../../../../shared/services/auth.service';
import { ConfirmDialogService } from '../../../../shared/services/confirm-dialog.service';
import { PermissionsService } from '../../../../shared/services/permissions.service';
import { SubjectsService } from '../../../../shared/services/subjects.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { FormSubjectComponent } from '../components/form-subject/form-subject.component';

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
  private readonly _toastService = inject(ToastService);
  private readonly _confirmDialogService = inject(ConfirmDialogService);
  private readonly _permissionsService = inject(PermissionsService);
  private readonly _authService = inject(AuthService);

  @ViewChild('pTable') pTable?: Table;

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
    this.isLoading = true;
    this.hasError = false;

    this._subjectsService
      .getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (subjects) => {
          this.subjects = subjects;
          this.hasError = false;
        },
        error: () => (this.hasError = true),
      });
  }

  public createSubject(): void {
    this._dynamicDialogRef = this._dialogService.open(FormSubjectComponent, {
      data: { actionType: ESubjectActions.CREATE, subject: {} },
    });

    this._dynamicDialogRef.onClose
      .pipe(switchMap(({ subject }) => this._subjectsService.create(subject)))
      .subscribe({
        next: (data) => {
          this.subjects = [...this.subjects, data];
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
    });

    this._dynamicDialogRef.onClose
      .pipe(switchMap(({ subject }) => this._subjectsService.updateById(subject)))
      .subscribe({
        next: (subject) => {
          const index = this.subjects.findIndex((s) => s.id === subject.id);
          this.subjects[index] = { ...this.subjects[index], ...subject };
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

  public deleteSubject(subject: ISubject): void {
    this._confirmDialogService.confirm(
      {
        title: 'Atenção!',
        message: `Deseja confirmar a exclusão da matéria <b>${subject.name}</b>?`,
      },
      () => this._deleteSubjectById(subject.id)
    );
  }

  private _deleteSubjectById(subjectId: string): void {
    this._subjectsService.deleteById(subjectId).subscribe({
      next: () => {
        this.subjects = this.subjects.filter((subject) => subject.id !== subjectId);
        this._toastService.open({ type: 'success', message: 'Matéria excluída com sucesso.' });
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this._toastService.open({
          type: 'error',
          message: 'Erro ao tentar excluir a matéria. Verifique os detalhes no console.',
        });
      },
    });
  }

  public clearFilterTable(): void {
    this.pTable?.clear();
  }

  public applyFilterGlobal($event: any, value: string): void {
    this.pTable?.filterGlobal(($event.target as HTMLInputElement).value, value);
  }
}
