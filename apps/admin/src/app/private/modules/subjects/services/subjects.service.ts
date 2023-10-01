import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ISubject } from '@libs/shared/domain';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SubjectsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _baseUrl = `${environment.apiUrl}/subjects`;

  constructor() {}

  public getAll(): Observable<ISubject[]> {
    return this._httpClient.get<ISubject[]>(`${this._baseUrl}`);
  }

  public getById(id: string): Observable<ISubject> {
    return this._httpClient.get<ISubject>(`${this._baseUrl}/${id}`);
  }

  public create(subject: Partial<Omit<ISubject, 'id'>>): Observable<ISubject> {
    return this._httpClient.post<ISubject>(`${this._baseUrl}`, subject);
  }

  public updateById(partialSubject: ISubject): Observable<ISubject> {
    return this._httpClient.put<ISubject>(`${this._baseUrl}/${partialSubject.id}`, partialSubject);
  }

  public deleteById(subject: ISubject): Observable<void> {
    return this._httpClient.delete<void>(`${this._baseUrl}/${subject.id}`);
  }
}
