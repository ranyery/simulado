import { Clipboard } from '@angular/cdk/clipboard';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IQuestion } from '@libs/shared/domain';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { finalize, switchMap } from 'rxjs';

import { ConfirmDialogService } from '../../../../shared/services/confirm-dialog.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { FormQuestionComponent } from '../components/form-question/form-question.component';
import { QuestionsService } from '../services/questions.service';
import { QuestionsState } from '../state/questions.state';

export const enum EQuestionActions {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
  private _dynamicDialogRef = inject(DynamicDialogRef);
  private readonly _dialogService = inject(DialogService);
  private readonly _toastService = inject(ToastService);
  private readonly _confirmDialogService = inject(ConfirmDialogService);

  private readonly _clipboard = inject(Clipboard);

  private readonly _questionsService = inject(QuestionsService);
  private readonly _questionsState = inject(QuestionsState);

  @ViewChild('pTable')
  private readonly _pTable?: Table;

  public questions: IQuestion[] = [];
  public isLoading: boolean = true;
  public hasError: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this._fetchAllQuestions();
  }

  private _fetchAllQuestions(): void {
    if (!this._questionsState.isEmpty()) {
      this.questions = this._questionsState.getAll();
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.hasError = false;

    this._questionsService
      .getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (questions) => {
          this.questions = questions;
          this._questionsState.set(questions);
          this.hasError = false;
        },
        error: () => (this.hasError = true),
      });
  }

  public createQuestion(): void {
    this._dynamicDialogRef = this._dialogService.open(FormQuestionComponent, {
      data: { actionType: EQuestionActions.CREATE, question: {} },
      closable: false,
    });

    this._dynamicDialogRef.onClose
      .pipe(switchMap(({ question }) => this._questionsService.create(question)))
      .subscribe({
        next: (data) => {
          this.questions = [...this.questions, data];
          this._questionsState.set(this.questions);
          this._toastService.open({ type: 'success', message: 'Questão criada com sucesso.' });
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this._toastService.open({
            type: 'error',
            message: 'Erro ao tentar criar uma nova questão. Verifique os detalhes no console.',
          });
        },
      });
  }

  public updateQuestion(question: IQuestion): void {
    this._dynamicDialogRef = this._dialogService.open(FormQuestionComponent, {
      data: { actionType: EQuestionActions.UPDATE, question },
      closable: false,
    });

    this._dynamicDialogRef.onClose
      .pipe(switchMap(({ question }) => this._questionsService.updateById(question)))
      .subscribe({
        next: (question) => {
          this.questions = this.questions.map((q) => {
            if (q.id !== question.id) return q;
            return { ...q, ...question };
          });
          this._questionsState.set(this.questions);

          this._toastService.open({ type: 'success', message: 'Questão atualizada com sucesso.' });
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this._toastService.open({
            type: 'error',
            message: 'Erro ao tentar atualizar a questão. Verifique os detalhes no console.',
          });
        },
      });
  }

  public deleteQuestion(question: IQuestion): void {
    this._confirmDialogService.confirm(
      { title: 'Atenção!', message: `Deseja excluir a questão?` },
      () => this._deleteQuestionById(question)
    );
  }

  public copyToClipboard(value: string): void {
    this._clipboard.copy(value);
    this._toastService.open({ type: 'info', message: 'Id copiado para a área de transferência.' });
  }

  private _deleteQuestionById(question: IQuestion): void {
    this._questionsService.deleteById(question).subscribe({
      next: () => {
        this.questions = this.questions.filter((sub) => sub.id !== question.id);
        this._questionsState.set(this.questions);

        this._toastService.open({ type: 'success', message: 'Questão deletada com sucesso.' });
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this._toastService.open({
          type: 'error',
          message: 'Erro ao tentar deletar a questão. Verifique os detalhes no console.',
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
