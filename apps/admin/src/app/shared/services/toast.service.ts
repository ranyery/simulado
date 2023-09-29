import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

type IToastType = 'success' | 'error' | 'warn';
type IToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-center';

interface IToastProps {
  type: IToastType;
  message: string;
  life?: number;
  closable?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _messageService = inject(MessageService);

  private readonly _titleMap: Record<IToastType, string> = {
    success: 'Sucesso!',
    error: 'Erro!',
    warn: 'Aviso!',
  };

  public position: IToastPosition = 'top-right';

  constructor() {}

  public open(props: IToastProps): void {
    this._messageService.add({
      severity: props.type,
      summary: this._titleMap[props.type],
      detail: props.message,
      life: props.life ?? 3000,
      closable: props.closable ?? true,
    });
  }

  public close(): void {
    this._messageService.clear();
  }

  public setPosition(position: IToastPosition): void {
    this.position = position;
  }
}
