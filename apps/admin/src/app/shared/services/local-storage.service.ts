import { Injectable } from '@angular/core';

import { ELocalStorage } from '../constants/local-storage.enum';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly _storage: Storage;

  constructor() {
    this._storage = window.localStorage;
  }

  public setItem(key: ELocalStorage, value: any): void {
    this._storage.setItem(key, value);
  }

  public getItem(key: ELocalStorage): string | null {
    return this._storage.getItem(key);
  }

  public removeItem(key: ELocalStorage): void {
    this._storage.removeItem(key);
  }
}
