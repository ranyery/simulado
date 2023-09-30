import { Injectable } from '@angular/core';
import { ISubject } from '@libs/shared/domain';

@Injectable({ providedIn: 'root' })
export class SubjectsState {
  private _subjects: ISubject[] = [];

  constructor() {}

  public set(subjects: ISubject[]): void {
    this._subjects = [...subjects];
  }

  public get(): ISubject[] {
    return [...this._subjects];
  }

  public isEmpty(): boolean {
    return this._subjects.length === 0;
  }
}
