import { Injectable } from '@angular/core';
import { ISubject } from '@simulado/domain';

import subjects from './../../../assets/data/json/subjects.json';

@Injectable({ providedIn: 'root' })
export class SubjectsState {
  private _subjects: ISubject[] = subjects as ISubject[];

  constructor() {}

  public set(subjects: ISubject[]): void {
    this._subjects = [...subjects];
  }

  public getAll(): ISubject[] {
    return [...this._subjects];
  }

  public getById(id: string): ISubject | undefined {
    return this._subjects.find((subject) => subject.id === id);
  }

  public isEmpty(): boolean {
    return this._subjects.length === 0;
  }
}
