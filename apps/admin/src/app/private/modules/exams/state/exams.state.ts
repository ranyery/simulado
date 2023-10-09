import { Injectable } from '@angular/core';
import { IExam } from '@libs/shared/domain';

@Injectable({ providedIn: 'root' })
export class ExamsState {
  private _exams: IExam[] = [];

  constructor() {}

  public set(exams: IExam[]): void {
    this._exams = [...exams];
  }

  public getAll(): IExam[] {
    return [...this._exams];
  }

  public getById(id: string): IExam | undefined {
    return this._exams.find((exam) => exam.id === id);
  }

  public isEmpty(): boolean {
    return this._exams.length === 0;
  }
}
