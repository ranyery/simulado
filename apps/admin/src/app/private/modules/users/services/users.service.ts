import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '@libs/shared/domain';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _baseUrl = `${environment.apiUrl}/users`;

  constructor() {}

  public getAll(): Observable<IUser[]> {
    return this._httpClient.get<IUser[]>(this._baseUrl);
  }
}
