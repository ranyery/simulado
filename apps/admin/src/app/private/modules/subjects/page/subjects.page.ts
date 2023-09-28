import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ISubject } from '@libs/shared/domain';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';

import { SubjectsService } from '../../../../shared/services/subjects.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { FormSubjectComponent } from '../components/form-subject/form-subject.component';

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

  public isLoading: boolean = true;
  public hasError: boolean = false;

  public subjects: ISubject[] = [];

  constructor() {}

  ngOnInit(): void {
    this._fetchAllSubjects();
  }

  public editSubject(subject?: ISubject): void {
    this._dynamicDialogRef = this._dialogService.open(FormSubjectComponent, { data: { subject } });

    this._dynamicDialogRef.onClose.subscribe((data: { type: string; subject: ISubject }) => {
      if (!data) {
        return;
      }

      const { type, subject } = data;

      if (type === 'CREATE') {
        this._createSubject(subject);
      } else if (type === 'UPDATE') {
        this._updateSubject(subject);
      }
    });
  }

  public deleteSubject(subjectId: string): void {
    this._subjectsService.deleteById(subjectId).subscribe({
      next: () => {
        this.subjects = this.subjects.filter((subject) => subject.id !== subjectId);
        this._toastService.open({
          type: 'success',
          message: 'Disciplina excluída com sucesso.',
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this._toastService.open({
          type: 'error',
          message: 'Erro ao tentar excluir a disciplina. Verifique os detalhes no console.',
        });
      },
    });
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

  private _createSubject(subject: Partial<ISubject>): void {
    this._subjectsService.create(subject).subscribe({
      next: (data) => {
        this.subjects = [...this.subjects, data];
      },
      error: () => {},
    });
  }

  private _updateSubject(subject: ISubject): void {
    this._subjectsService.updateById(subject).subscribe({
      next: (data) => {
        const INDEX_NOT_FOUND = -1;
        const index = this.subjects.findIndex((s) => s.id === data.id);
        if (index === INDEX_NOT_FOUND) {
          return;
        }

        this.subjects[index] = { ...this.subjects[index], ...data };
      },
      error: () => {},
    });
  }
}
