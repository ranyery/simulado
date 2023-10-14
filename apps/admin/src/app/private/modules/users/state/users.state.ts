import { Injectable } from '@angular/core';
import { IUser } from '@simulado/domain';

@Injectable({ providedIn: 'root' })
export class UsersState {
  private _users: IUser[] = [];

  constructor() {}

  public set(users: IUser[]): void {
    this._users = [...users];
  }

  public getAll(): IUser[] {
    return [...this._users];
  }

  public isEmpty(): boolean {
    return this._users.length === 0;
  }
}
