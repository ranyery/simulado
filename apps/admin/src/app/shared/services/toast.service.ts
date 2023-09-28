import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

type IToastType = 'success' | 'error' | 'warn';

interface IToastProps {
  type: IToastType;
  message: string;
  life?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _messageService = inject(MessageService);

  private readonly _titleMap: Record<IToastType, string> = {
    success: 'Sucesso!',
    error: 'Erro!',
    warn: 'Aviso!',
  };

  constructor() {}

  public open(props: IToastProps): void {
    this._messageService.add({
      severity: props.type,
      summary: this._titleMap[props.type],
      detail: props.message,
      life: props.life || 3000,
    });
  }

  public close(): void {
    this._messageService.clear();
  }
}
