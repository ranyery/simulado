import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ITopic } from '@libs/shared/domain';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TopicsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _baseUrl = `${environment.apiUrl}/topics`;

  constructor() {}

  public getAll(): Observable<ITopic[]> {
    return this._httpClient.get<ITopic[]>(`${this._baseUrl}`);
  }

  public getById(id: string): Observable<ITopic> {
    return this._httpClient.get<ITopic>(`${this._baseUrl}/${id}`);
  }

  public create(topic: Partial<Omit<ITopic, 'id'>>): Observable<ITopic> {
    return this._httpClient.post<ITopic>(`${this._baseUrl}`, topic);
  }

  public updateById(partialTopic: ITopic): Observable<ITopic> {
    return this._httpClient.put<ITopic>(`${this._baseUrl}/${partialTopic.id}`, partialTopic);
  }

  public deleteById(topic: ITopic): Observable<void> {
    return this._httpClient.delete<void>(`${this._baseUrl}/${topic.id}`);
  }
}
