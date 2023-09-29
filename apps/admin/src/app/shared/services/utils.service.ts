import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  constructor() {}

  public removeNullOrUndefinedOrEmptyProperties<T>(obj: Record<string, any>): T {
    const newObj: Record<string, any> = {};

    for (const key in obj) {
      const value = obj[key];

      if (
        value !== null &&
        value !== undefined &&
        !(Array.isArray(value) && value.length === 0) && // Verifica se é um array vazio
        !(typeof value === 'object' && Object.keys(value).length === 0) // Verifica se é um objeto vazio
      ) {
        newObj[key] = value;
      }
    }

    return newObj as T;
  }
}
