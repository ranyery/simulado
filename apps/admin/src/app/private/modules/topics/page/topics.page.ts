import { Clipboard } from '@angular/cdk/clipboard';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ISubject, ITopic } from '@simulado/domain';
import { SubjectsState, TopicsState } from '@simulado/services';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { finalize, forkJoin, iif, of, switchMap } from 'rxjs';

import { ConfirmDialogService } from '../../../../shared/services/confirm-dialog.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { SubjectsService } from '../../subjects/services/subjects.service';
import { FormTopicComponent } from '../components/form-topic/form-topic.component';
import { TopicsService } from '../services/topics.service';

export const enum ETopicActions {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

@Component({
  selector: 'app-topics',
  templateUrl: './topics.page.html',
  styleUrls: ['./topics.page.scss'],
})
export class TopicsPage implements OnInit {
  private _dynamicDialogRef = inject(DynamicDialogRef);
  private readonly _dialogService = inject(DialogService);
  private readonly _toastService = inject(ToastService);
  private readonly _confirmDialogService = inject(ConfirmDialogService);

  private readonly _clipboard = inject(Clipboard);

  private readonly _topicsState = inject(TopicsState);
  private readonly _topicsService = inject(TopicsService);

  private readonly _subjectsState = inject(SubjectsState);
  private readonly _subjectsService = inject(SubjectsService);

  public subjectList: ISubject[] = [];

  @ViewChild('pTable')
  private readonly _pTable?: Table;

  public topics: ITopic[] = [];
  public isLoading: boolean = true;
  public hasError: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this._fetchTopicsAndSubjects();
  }

  private _fetchTopicsAndSubjects(): void {
    const topicsObservable = iif(
      () => this._topicsState.isEmpty(),
      this._topicsService.getAll(),
      of(this._topicsState.getAll())
    );

    const subjectsObservable = iif(
      () => this._subjectsState.isEmpty(),
      this._subjectsService.getAll(),
      of(this._subjectsState.getAll())
    );

    this.isLoading = true;
    this.hasError = false;

    forkJoin([topicsObservable, subjectsObservable])
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: ([topics, subjects]) => {
          this.topics = topics;
          this.subjectList = subjects;

          this._topicsState.set(topics);
          this._subjectsState.set(subjects);
          this.hasError = false;
        },
        error: () => (this.hasError = true),
      });
  }

  public createTopic(): void {
    this._dynamicDialogRef = this._dialogService.open(FormTopicComponent, {
      data: { actionType: ETopicActions.CREATE, topic: {}, subjects: this.subjectList },
      closable: false,
    });

    this._dynamicDialogRef.onClose
      .pipe(switchMap(({ topic }) => this._topicsService.create(topic)))
      .subscribe({
        next: (data) => {
          this.topics = [...this.topics, data];
          this._topicsState.set(this.topics);

          this._toastService.open({ type: 'success', message: 'Tópico criado com sucesso.' });
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this._toastService.open({
            type: 'error',
            message: 'Erro ao tentar criar um novo tópico. Verifique os detalhes no console.',
          });
        },
      });
  }

  public updateTopic(topic: ITopic): void {
    this._dynamicDialogRef = this._dialogService.open(FormTopicComponent, {
      data: { actionType: ETopicActions.UPDATE, topic: topic, subjects: this.subjectList },
      closable: false,
    });

    this._dynamicDialogRef.onClose
      .pipe(switchMap(({ topic }) => this._topicsService.updateById(topic)))
      .subscribe({
        next: (topic) => {
          this.topics = this.topics.map((sub) => {
            if (sub.id !== topic.id) return sub;
            return { ...sub, ...topic };
          });
          this._topicsState.set(this.topics);

          this._toastService.open({ type: 'success', message: 'Tópico atualizado com sucesso.' });
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this._toastService.open({
            type: 'error',
            message: 'Erro ao tentar atualizar o tópico. Verifique os detalhes no console.',
          });
        },
      });
  }

  public deleteTopic(topic: ITopic): void {
    this._confirmDialogService.confirm(
      { title: 'Atenção!', message: `Deseja deletar o tópico <b>${topic.name}</b>?` },
      () => this._deleteTopicById(topic)
    );
  }

  public copyToClipboard(value: string): void {
    this._clipboard.copy(value);
    this._toastService.open({ type: 'info', message: 'Id copiado para a área de transferência.' });
  }

  private _deleteTopicById(topic: ITopic): void {
    this._topicsService.deleteById(topic).subscribe({
      next: () => {
        this.topics = this.topics.filter((t) => t.id !== topic.id);
        this._topicsState.set(this.topics);

        this._toastService.open({ type: 'success', message: 'Tópico deletado com sucesso.' });
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this._toastService.open({
          type: 'error',
          message: 'Erro ao tentar deletar o tópico. Verifique os detalhes no console.',
        });
      },
    });
  }

  public applyFilterGlobal(event: Event, value: string): void {
    this._pTable?.filterGlobal((event.target as HTMLInputElement).value, value);
  }
}
