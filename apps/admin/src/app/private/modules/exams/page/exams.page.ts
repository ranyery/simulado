import { Clipboard } from '@angular/cdk/clipboard';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IExam } from '@libs/shared/domain';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { finalize, switchMap } from 'rxjs';

import { ConfirmDialogService } from '../../../../shared/services/confirm-dialog.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { FormExamComponent } from '../components/form-exam/form-exam.component';
import { ExamsService } from '../services/exams.service';
import { ExamsState } from '../state/exams.state';

export const enum EExamActions {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

@Component({
  selector: 'app-exams',
  templateUrl: './exams.page.html',
  styleUrls: ['./exams.page.scss'],
})
export class ExamsPage implements OnInit {
  private _dynamicDialogRef = inject(DynamicDialogRef);
  private readonly _dialogService = inject(DialogService);
  private readonly _toastService = inject(ToastService);
  private readonly _confirmDialogService = inject(ConfirmDialogService);

  private readonly _clipboard = inject(Clipboard);

  private readonly _examsService = inject(ExamsService);
  private readonly _examsState = inject(ExamsState);

  @ViewChild('pTable')
  private readonly _pTable?: Table;

  public exams: IExam[] = [];
  public isLoading: boolean = true;
  public hasError: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this._fetchAllExams();
  }

  private _fetchAllExams(): void {
    if (!this._examsState.isEmpty()) {
      this.exams = this._examsState.getAll();
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.hasError = false;

    this._examsService
      .getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (exams) => {
          this.exams = exams;
          this._examsState.set(exams);
          this.hasError = false;
        },
        error: () => (this.hasError = true),
      });
  }

  public createExam(): void {
    this._dynamicDialogRef = this._dialogService.open(FormExamComponent, {
      data: { actionType: EExamActions.CREATE, exam: {} },
      closable: false,
    });

    this._dynamicDialogRef.onClose
      .pipe(switchMap(({ exam }) => this._examsService.create(exam)))
      .subscribe({
        next: (data) => {
          this.exams = [...this.exams, data];
          this._examsState.set(this.exams);
          this._toastService.open({ type: 'success', message: 'Exame criado com sucesso.' });
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this._toastService.open({
            type: 'error',
            message: 'Erro ao tentar criar um novo exame. Verifique os detalhes no console.',
          });
        },
      });
  }

  public updateExam(exam: IExam): void {
    this._dynamicDialogRef = this._dialogService.open(FormExamComponent, {
      data: { actionType: EExamActions.UPDATE, exam },
      closable: false,
    });

    this._dynamicDialogRef.onClose
      .pipe(switchMap(({ exam }) => this._examsService.updateById(exam)))
      .subscribe({
        next: (exam) => {
          this.exams = this.exams.map((sub) => {
            if (sub.id !== exam.id) return sub;
            return { ...sub, ...exam };
          });
          this._examsState.set(this.exams);

          this._toastService.open({ type: 'success', message: 'Exame atualizado com sucesso.' });
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this._toastService.open({
            type: 'error',
            message: 'Erro ao tentar atualizar o exame. Verifique os detalhes no console.',
          });
        },
      });
  }

  public deleteExam(exam: IExam): void {
    this._confirmDialogService.confirm(
      { title: 'Atenção!', message: `Deseja excluir o exame <b>${exam.acronym}</b>?` },
      () => this._deleteExamById(exam)
    );
  }

  public copyToClipboard(value: string): void {
    this._clipboard.copy(value);
    this._toastService.open({ type: 'info', message: 'Id copiado para a área de transferência.' });
  }

  private _deleteExamById(exam: IExam): void {
    this._examsService.deleteById(exam).subscribe({
      next: () => {
        this.exams = this.exams.filter((sub) => sub.id !== exam.id);
        this._examsState.set(this.exams);

        this._toastService.open({ type: 'success', message: 'Exame deletado com sucesso.' });
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this._toastService.open({
          type: 'error',
          message: 'Erro ao tentar deletar o exame. Verifique os detalhes no console.',
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
