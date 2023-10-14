import { Injectable } from '@angular/core';
import { ITopic } from '@simulado/domain';

import topics from './../../../assets/data/json/topics.json';

@Injectable({ providedIn: 'root' })
export class TopicsState {
  private _subjects: ITopic[] = topics as ITopic[];

  constructor() {}

  public set(subjects: ITopic[]): void {
    this._subjects = [...subjects];
  }

  public getAll(): ITopic[] {
    return [...this._subjects];
  }

  public getById(subjectId: string): ITopic | undefined {
    return this._subjects.find((s) => s.id === subjectId);
  }

  public isEmpty(): boolean {
    return this._subjects.length === 0;
  }
}
