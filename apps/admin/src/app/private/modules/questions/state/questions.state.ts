import { Injectable } from '@angular/core';
import { IQuestion } from '@libs/shared/domain';

@Injectable({ providedIn: 'root' })
export class QuestionsState {
  private _questions: IQuestion[] = [];

  constructor() {}

  public set(questions: IQuestion[]): void {
    this._questions = [...questions];
  }

  public getAll(): IQuestion[] {
    return [...this._questions];
  }

  public isEmpty(): boolean {
    return this._questions.length === 0;
  }
}
