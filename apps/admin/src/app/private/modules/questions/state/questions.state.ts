import { Injectable } from '@angular/core';
import { IQuestion } from '@simulado/domain';

import { BaseState } from '../../../../shared/classes/base.state';

@Injectable({ providedIn: 'root' })
export class QuestionsState implements BaseState<IQuestion> {
  private _questions: IQuestion[] = [];
  private _isSynced: boolean = false;

  constructor() {}

  public get isSynced(): boolean {
    return this._isSynced;
  }

  public set isSynced(value: boolean) {
    this._isSynced = value;
  }

  public add(question: IQuestion): void {
    this._questions = [...this._questions, question];
  }

  public addAll(questions: IQuestion[]): void {
    this._questions = questions;
  }

  public update(updatedQuestion: IQuestion): void {
    this._questions = this._questions.map((question) => {
      if (question.id !== updatedQuestion.id) return question;
      return { ...question, ...updatedQuestion };
    });
  }

  public deleteById(id: string): void {
    this._questions = this._questions.filter((question) => question.id !== id);
  }

  public getById(id: string): IQuestion | undefined {
    return this._questions.find((question) => question.id === id);
  }

  public getAll(): IQuestion[] {
    return [...this._questions];
  }

  public isEmpty(): boolean {
    return this._questions.length === 0;
  }
}
