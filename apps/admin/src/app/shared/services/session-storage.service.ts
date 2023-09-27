import { Injectable } from '@angular/core';

import { ESessionStorage } from '../constants/session-storage.enum';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  private readonly _storage: Storage;

  constructor() {
    this._storage = window.sessionStorage;
  }

  public setItem(key: ESessionStorage, value: any): void {
    this._storage.setItem(key, value);
  }

  public getItem(key: ESessionStorage): string | null {
    return this._storage.getItem(key);
  }

  public removeItem(key: ESessionStorage): void {
    this._storage.removeItem(key);
  }
}
