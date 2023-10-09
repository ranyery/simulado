import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IExam } from '@libs/shared/domain';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ExamsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _baseUrl = `${environment.apiUrl}/exams`;

  constructor() {}

  public getAll(): Observable<IExam[]> {
    return this._httpClient.get<IExam[]>(`${this._baseUrl}`);
  }

  public getById(id: string): Observable<IExam> {
    return this._httpClient.get<IExam>(`${this._baseUrl}/${id}`);
  }

  public create(exam: Partial<Omit<IExam, 'id'>>): Observable<IExam> {
    return this._httpClient.post<IExam>(`${this._baseUrl}`, exam);
  }

  public updateById(partialExam: IExam): Observable<IExam> {
    return this._httpClient.put<IExam>(`${this._baseUrl}/${partialExam.id}`, partialExam);
  }

  public deleteById(exam: IExam): Observable<void> {
    return this._httpClient.delete<void>(`${this._baseUrl}/${exam.id}`);
  }
}
