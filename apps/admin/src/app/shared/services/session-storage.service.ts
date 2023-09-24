import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  private readonly _storage: Storage;

  constructor() {
    this._storage = window.sessionStorage;
  }

  public setItem(key: string, value: any): void {
    this._storage.setItem(key, value);
  }

  public getItem(key: string): string | null {
    return this._storage.getItem(key);
  }

  public removeItem(key: string): void {
    this._storage.removeItem(key);
  }
}
