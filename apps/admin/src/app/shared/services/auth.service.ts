import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ESessionStorage } from '../constants/storage.enum';
import { ILoginResponse } from '../interfaces/login.interface';
import { JwtService } from './jwt.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _router = inject(Router);
  private readonly _jwtService = inject(JwtService);
  private readonly _sessionStorageService = inject(SessionStorageService);

  public isLoggedIn: boolean = false;

  public get token(): string {
    return this._sessionStorageService.getItem(ESessionStorage.ACCESS_TOKEN) || '';
  }

  public set token(access_token: string) {
    this._sessionStorageService.setItem(ESessionStorage.ACCESS_TOKEN, access_token);
  }

  public login(email: string, password: string): Observable<ILoginResponse> {
    return this._httpClient
      .post<ILoginResponse>(`${environment.apiUrl}/login`, { email, password })
      .pipe(
        catchError((httpError: HttpErrorResponse) => {
          this.logout();
          throw httpError;
        }),
        tap(({ access_token }) => {
          this.token = access_token;
          this.isLoggedIn = true;
        })
      );
  }

  public validateToken(): Observable<boolean> {
    if (!this.token || this._jwtService.isTokenExpired) {
      return of(false);
    }

    if (this.isLoggedIn) return of(true);

    return this._httpClient
      .post<void>(`${environment.apiUrl}/users/validate-token`, null, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .pipe(
        map(() => {
          this.isLoggedIn = true;
          return true;
        }),
        catchError(() => {
          this.logout();
          return of(false);
        })
      );
  }

  public logout(): void {
    this._clearToken();
    this.isLoggedIn = false;
    this._redirectToLoginPage();
  }

  private _clearToken(): void {
    this._sessionStorageService.removeItem(ESessionStorage.ACCESS_TOKEN);
  }

  private _redirectToLoginPage(): void {
    this._router.navigate(['/', 'login']);
  }
}
