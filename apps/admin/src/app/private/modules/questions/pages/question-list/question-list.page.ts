import { Clipboard } from '@angular/cdk/clipboard';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuestion } from '@simulado/domain';
import { Table } from 'primeng/table';
import { finalize, fromEvent, Subscription, throttleTime } from 'rxjs';

import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';
import { ToastService } from '../../../../../shared/services/toast.service';
import { QuestionsService } from '../../services/questions.service';
import { QuestionsState } from '../../state/questions.state';

export const enum EQuestionActions {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.page.html',
  styleUrls: ['./question-list.page.scss'],
})
export class QuestionListPage implements OnInit, OnDestroy {
  private readonly _toastService = inject(ToastService);
  private readonly _confirmDialogService = inject(ConfirmDialogService);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);

  private readonly _clipboard = inject(Clipboard);

  private readonly _questionsService = inject(QuestionsService);
  private readonly _questionsState = inject(QuestionsState);

  @ViewChild('pTable')
  private readonly _pTable?: Table;
  private _pTableBodyWrapper: HTMLDivElement | null = null;
  private _subscription = new Subscription();

  public questions: IQuestion[] = [...this._questionsState.getAll()];

  private readonly _pageSize: number = 20;
  private _currentPage: number = Math.floor(this.questions.length / this._pageSize) + 1;
  private _hasMoreItems: boolean = this.questions.length % this._pageSize === 0;
  private _orderBy: 'asc' | 'desc' = 'asc';
  private _searchTerm?: string;

  public isLoading: boolean = true;
  public hasError: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this._fetchQuestions();
  }

  private _fetchQuestions(): void {
    if (this._questionsState.isSynced) {
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this._questionsService
      .getAll({
        top: this._pageSize,
        skip: (this._currentPage - 1) * this._pageSize,
        search: this._searchTerm,
        orderBy: this._orderBy,
      })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (questions) => {
          this.questions = [...this.questions, ...questions];
          this._questionsState.addAll(this.questions);

          this.hasError = false;
          this._currentPage += 1;
          this._hasMoreItems = questions.length === this._pageSize;
          this._questionsState.isSynced = !this._hasMoreItems;

          if (!this._pTableBodyWrapper) this._tryListenTableBodyScroll();
        },
        error: () => (this.hasError = true),
      });
  }

  private _tryListenTableBodyScroll(): void {
    this._pTableBodyWrapper = document.querySelector('.p-datatable-wrapper');
    if (!this._pTableBodyWrapper) return;

    this._subscription = fromEvent(this._pTableBodyWrapper, 'scroll')
      .pipe(throttleTime(200))
      .subscribe(() => {
        if (this.isLoading || !this._hasMoreItems) {
          return;
        }

        const currentScrollPosition = this._pTableBodyWrapper?.scrollTop ?? 0;
        const totalHeightContent = this._pTableBodyWrapper?.scrollHeight ?? 0;

        if (currentScrollPosition >= totalHeightContent * 0.4) {
          this._fetchQuestions();
        }
      });
  }

  public createQuestion(): void {
    this._router.navigate(['crud'], { relativeTo: this._activatedRoute });
  }

  public updateQuestion(question: IQuestion): void {
    this._router.navigate(['crud', question.id], {
      state: { question },
      relativeTo: this._activatedRoute,
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
        this._questionsState.addAll(this.questions);

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

  public applyFilterGlobal(event: Event, value: string): void {
    this._pTable?.filterGlobal((event.target as HTMLInputElement).value, value);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
