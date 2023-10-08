import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ESessionStorage } from '../constants/session-storage.enum';
import { NotImplemented } from '../decorators/not-implemented.decorator';
import { ILoginResponse } from '../interfaces/login.interface';
import { JwtService } from './jwt.service';
import { SessionStorageService } from './session-storage.service';
import { UserPermissionsService } from './user-permissions.service';
import { UserRolesService } from './user-roles.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _router = inject(Router);
  private readonly _jwtService = inject(JwtService);
  private readonly _userPermissionsService = inject(UserPermissionsService);
  private readonly _userRolesService = inject(UserRolesService);
  private readonly _sessionStorageService = inject(SessionStorageService);

  private readonly _baseUrl = `${environment.apiUrl}/auth`;

  private _isLoggedIn: boolean = false;

  public get token(): string {
    return this._sessionStorageService.getItem(ESessionStorage.ACCESS_TOKEN) || '';
  }

  public set token(access_token: string) {
    this._sessionStorageService.setItem(ESessionStorage.ACCESS_TOKEN, access_token);
  }

  public login(email: string, password: string): Observable<ILoginResponse> {
    return this._httpClient
      .post<ILoginResponse>(`${this._baseUrl}/login`, { email, password })
      .pipe(
        catchError((httpError: HttpErrorResponse) => {
          this.logout();
          throw httpError;
        }),
        tap(({ access_token }) => {
          this.token = access_token;
          this._isLoggedIn = true;
          this._userRolesService.updateRoles();
          this._userPermissionsService.updatePermissions();
        })
      );
  }

  public validateToken(): Observable<boolean> {
    if (!this.token || this._jwtService.isTokenExpired) {
      return of(false);
    }

    if (this._isLoggedIn) return of(true);

    return this._httpClient.post<void>(`${this._baseUrl}/validate-token`, null).pipe(
      map(() => {
        this._isLoggedIn = true;
        this._userRolesService.updateRoles();
        this._userPermissionsService.updatePermissions();
        return true;
      }),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }

  @NotImplemented
  public refreshToken(): void {}

  public logout(): void {
    this._clearToken();
    this._isLoggedIn = false;
    this._redirectToLoginPage();
  }

  private _clearToken(): void {
    this._sessionStorageService.removeItem(ESessionStorage.ACCESS_TOKEN);
  }

  private _redirectToLoginPage(): void {
    this._router.navigate(['/', 'login']);
  }
}
