import { Clipboard } from '@angular/cdk/clipboard';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IUser } from '@libs/shared/domain';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';

import { ToastService } from '../../../../shared/services/toast.service';
import { UsersService } from '../services/users.service';
import { UsersState } from '../state/users.state';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  private readonly _usersState = inject(UsersState);
  private readonly _usersService = inject(UsersService);

  private readonly _clipboard = inject(Clipboard);
  private readonly _toastService = inject(ToastService);

  @ViewChild('pTable')
  private readonly _pTable?: Table;

  public users: IUser[] = [];
  public isLoading: boolean = true;
  public hasError: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this._fetchUsers();
  }

  private _fetchUsers(): void {
    if (!this._usersState.isEmpty()) {
      this.users = this._usersState.getAll();
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.hasError = false;

    this._usersService
      .getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (users) => {
          this.users = users;
          this._usersState.set(users);
          this.hasError = false;
        },
        error: () => (this.hasError = true),
      });
  }

  public copyToClipboard(value: string): void {
    this._clipboard.copy(value);
    this._toastService.open({ type: 'info', message: 'Id copiado para a área de transferência.' });
  }

  public clearFilterTable(): void {
    this._pTable?.clear();
  }

  public applyFilterGlobal(event: Event, value: string): void {
    this._pTable?.filterGlobal((event.target as HTMLInputElement).value, value);
  }
}
