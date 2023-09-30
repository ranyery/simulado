import { Clipboard } from '@angular/cdk/clipboard';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { EEntity, ETopicStatus, ITopic } from '@libs/shared/domain';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { finalize, switchMap } from 'rxjs';

import { AuthService } from '../../../../shared/services/auth.service';
import { ConfirmDialogService } from '../../../../shared/services/confirm-dialog.service';
import { PermissionsService } from '../../../../shared/services/permissions.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { FormTopicComponent } from '../components/form-topic/form-topic.component';
import { TopicsService } from '../services/topics.service';

export const enum ETopicActions {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

@Component({
  selector: 'app-topics',
  templateUrl: './topics.page.html',
  styleUrls: ['./topics.page.scss'],
})
export class TopicsPage implements OnInit {
  private _dynamicDialogRef = inject(DynamicDialogRef);
  private readonly _dialogService = inject(DialogService);
  private readonly _topicsService = inject(TopicsService);
  private readonly _toastService = inject(ToastService);
  private readonly _confirmDialogService = inject(ConfirmDialogService);
  private readonly _permissionsService = inject(PermissionsService);
  private readonly _authService = inject(AuthService);
  private readonly _clipboard = inject(Clipboard);

  @ViewChild('pTable')
  private readonly _pTable?: Table;

  public topics: ITopic[] = [];
  public isLoading: boolean = true;
  public hasError: boolean = false;

  public canRead: boolean = false;
  public canCreate: boolean = false;
  public canUpdate: boolean = false;
  public canDelete: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.canRead = this._permissionsService.canRead(EEntity.TOPICS);

    if (!this.canRead) {
      this._authService.logout();
      return;
    }

    this.canCreate = this._permissionsService.canCreate(EEntity.TOPICS);
    this.canUpdate = this._permissionsService.canUpdate(EEntity.TOPICS);
    this.canDelete = this._permissionsService.canDelete(EEntity.TOPICS);
    this._fetchAllTopics();
  }

  private _fetchAllTopics(): void {
    this.isLoading = true;
    this.hasError = false;

    this._topicsService
      .getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (topics) => {
          this.topics = topics;
          this.hasError = false;
        },
        error: () => (this.hasError = true),
      });
  }

  public createTopic(): void {
    this._dynamicDialogRef = this._dialogService.open(FormTopicComponent, {
      data: { actionType: ETopicActions.CREATE, topic: {} },
      closable: false,
    });

    this._dynamicDialogRef.onClose
      .pipe(switchMap(({ topic }) => this._topicsService.create(topic)))
      .subscribe({
        next: (data) => {
          this.topics = [...this.topics, data];
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
      data: { actionType: ETopicActions.UPDATE, topic: topic },
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

  public archiveTopic(topic: ITopic): void {
    this._confirmDialogService.confirm(
      { title: 'Atenção!', message: `Deseja arquivar o tópico <b>${topic.name}</b>?` },
      () => this._archiveTopicById(topic)
    );
  }

  public copyToClipboard(value: string): void {
    this._clipboard.copy(value);
    this._toastService.close();
    this._toastService.open({ type: 'info', message: 'Id copiado para a área de transferência.' });
  }

  private _archiveTopicById(topic: ITopic): void {
    this._topicsService.deleteById(topic.id).subscribe({
      next: () => {
        this.topics = this.topics.map((sub) => {
          if (sub.id !== topic.id) return sub;
          return { ...sub, status: ETopicStatus.ARCHIVED };
        });

        this._toastService.open({ type: 'success', message: 'Tópico arquivado com sucesso.' });
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this._toastService.open({
          type: 'error',
          message: 'Erro ao tentar arquivar o tópico. Verifique os detalhes no console.',
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
