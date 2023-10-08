import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IQuestion } from '@libs/shared/domain';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _baseUrl = `${environment.apiUrl}/questions`;

  constructor() {}

  public getAll(): Observable<IQuestion[]> {
    return this._httpClient.get<IQuestion[]>(`${this._baseUrl}`);
  }

  public getById(id: string): Observable<IQuestion> {
    return this._httpClient.get<IQuestion>(`${this._baseUrl}/${id}`);
  }

  public create(question: Partial<Omit<IQuestion, 'id'>>): Observable<IQuestion> {
    return this._httpClient.post<IQuestion>(`${this._baseUrl}`, question);
  }

  public updateById(partialQuestion: IQuestion): Observable<IQuestion> {
    return this._httpClient.put<IQuestion>(
      `${this._baseUrl}/${partialQuestion.id}`,
      partialQuestion
    );
  }

  public deleteById(question: IQuestion): Observable<void> {
    return this._httpClient.delete<void>(`${this._baseUrl}/${question.id}`);
  }
}
