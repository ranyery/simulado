import { Injectable } from '@angular/core';
import { IInstitute } from '@simulado/domain';

import institutes from './../../../assets/data/json/institutes.json';

@Injectable({ providedIn: 'root' })
export class InstitutesState {
  private _institutes: IInstitute[] = institutes as IInstitute[];

  constructor() {}

  public set(institutes: IInstitute[]): void {
    this._institutes = [...institutes];
  }

  public getAll(): IInstitute[] {
    return [...this._institutes];
  }

  public getById(id: string): IInstitute | undefined {
    return this._institutes.find((institute) => institute.id === id);
  }

  public isEmpty(): boolean {
    return this._institutes.length === 0;
  }
}
