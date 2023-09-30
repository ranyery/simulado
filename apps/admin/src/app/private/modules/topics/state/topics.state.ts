import { Injectable } from '@angular/core';
import { ITopic } from '@libs/shared/domain';

@Injectable({ providedIn: 'root' })
export class TopicsState {
  private _subjects: ITopic[] = [];

  constructor() {}

  public set(subjects: ITopic[]): void {
    this._subjects = [...subjects];
  }

  public get(): ITopic[] {
    return [...this._subjects];
  }

  public isEmpty(): boolean {
    return this._subjects.length === 0;
  }
}
