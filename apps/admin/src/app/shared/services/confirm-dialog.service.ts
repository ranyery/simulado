import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

type ConfirmDialogTypes = 'warn' | 'info';

interface IConfirmDialogProps {
  title: string;
  message: string;
  type?: ConfirmDialogTypes;
}

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  private readonly _confirmationService = inject(ConfirmationService);

  private readonly _confirmDialogTypesMap: Record<ConfirmDialogTypes, string> = {
    warn: 'pi pi-exclamation-triangle',
    info: 'pi pi-info-circle',
  };

  constructor() {}

  public confirm(props: IConfirmDialogProps, acceptCb: () => void, rejectCb?: () => void): void {
    this._confirmationService.confirm({
      header: props.title,
      message: props.message,
      icon: props.type
        ? this._confirmDialogTypesMap[props.type]
        : this._confirmDialogTypesMap['warn'],
      accept: () => acceptCb(),
      reject: () => rejectCb?.(),
    });
  }
}
