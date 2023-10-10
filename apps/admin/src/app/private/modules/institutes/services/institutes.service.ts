import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IInstitute } from '@libs/shared/domain';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InstitutesService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _baseUrl = `${environment.apiUrl}/institutes`;

  constructor() {}

  public getAll(): Observable<IInstitute[]> {
    return this._httpClient.get<IInstitute[]>(`${this._baseUrl}`);
  }

  public getById(id: string): Observable<IInstitute> {
    return this._httpClient.get<IInstitute>(`${this._baseUrl}/${id}`);
  }

  public create(institute: Partial<Omit<IInstitute, 'id'>>): Observable<IInstitute> {
    return this._httpClient.post<IInstitute>(`${this._baseUrl}`, institute);
  }

  public updateById(partialInstitute: IInstitute): Observable<IInstitute> {
    return this._httpClient.put<IInstitute>(
      `${this._baseUrl}/${partialInstitute.id}`,
      partialInstitute
    );
  }

  public deleteById(institute: IInstitute): Observable<void> {
    return this._httpClient.delete<void>(`${this._baseUrl}/${institute.id}`);
  }
}
