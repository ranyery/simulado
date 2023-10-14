import { inject, Injectable } from '@angular/core';
import { IJwt } from '@simulado/domain';
import jwtDecode from 'jwt-decode';

import { ESessionStorage } from '../constants/session-storage.enum';
import { SessionStorageService } from './session-storage.service';

@Injectable({ providedIn: 'root' })
export class JwtService {
  private readonly _sessionStorageService = inject(SessionStorageService);

  constructor() {}

  public decodeToken(): IJwt | null {
    const token = this._sessionStorageService.getItem(ESessionStorage.ACCESS_TOKEN);
    if (!token) return null;

    const decodedToken = jwtDecode<IJwt>(token);
    return decodedToken;
  }

  public get isTokenExpired(): boolean {
    const tokenExpirationDate = this.tokenExpirationDate;
    const dateFromNow = new Date();
    return tokenExpirationDate.getTime() < dateFromNow.getTime();
  }

  private get tokenExpirationDate(): Date {
    const decodedToken = this.decodeToken();

    if (!decodedToken) {
      const dateFromNow = new Date();
      const dateFromOneSecondAgo = new Date(dateFromNow.getTime() - 1000);
      return dateFromOneSecondAgo;
    }

    const expTimestamp = decodedToken.exp;
    const expirationDate = new Date(expTimestamp * 1000);
    return expirationDate;
  }
}
