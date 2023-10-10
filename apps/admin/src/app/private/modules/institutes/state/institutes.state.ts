import { Injectable } from '@angular/core';
import { IInstitute } from '@libs/shared/domain';

@Injectable({ providedIn: 'root' })
export class InstitutesState {
  private _institutes: IInstitute[] = [];

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
