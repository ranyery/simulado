import { Clipboard } from '@angular/cdk/clipboard';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuestion } from '@libs/shared/domain';
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
export class QuestionListPage implements OnInit, AfterViewInit, OnDestroy {
  private readonly _toastService = inject(ToastService);
  private readonly _confirmDialogService = inject(ConfirmDialogService);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);

  private readonly _clipboard = inject(Clipboard);

  private readonly _questionsService = inject(QuestionsService);
  private readonly _questionsState = inject(QuestionsState);

  @ViewChild('pTable')
  private readonly _pTable?: ElementRef<Table>;
  private _pTableBodyWrapper: HTMLDivElement | null = null;
  private _subscription = new Subscription();

  public questions: IQuestion[] = [];
  public isLoading: boolean = true;
  public hasError: boolean = false;

  private readonly _pageSize: number = 20;
  private _currentPage: number = 1;
  private _hasMoreItems: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this._fetchAllQuestions();
  }

  ngAfterViewInit(): void {
    this._pTableBodyWrapper = document.querySelector<HTMLDivElement>('.p-datatable-wrapper');
    if (!this._pTableBodyWrapper) return;

    this._subscription = fromEvent(this._pTableBodyWrapper, 'scroll')
      .pipe(throttleTime(300))
      .subscribe(() => {
        if (this.isLoading || !this._hasMoreItems) {
          return;
        }

        const currentScrollPosition = this._pTableBodyWrapper?.scrollTop ?? 0;
        const totalHeightContent = this._pTableBodyWrapper?.scrollWidth ?? 0;

        if (currentScrollPosition >= totalHeightContent * 0.7) {
          // Handle
          // this.isLoading = true;
          console.log('Carregando...');
        }
      });
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
          this._questionsState.addAll(questions);
          this.hasError = false;
        },
        error: () => (this.hasError = true),
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

  public clearFilterTable(): void {
    this._pTable?.nativeElement.clear();
  }

  public applyFilterGlobal(event: Event, value: string): void {
    this._pTable?.nativeElement.filterGlobal((event.target as HTMLInputElement).value, value);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
