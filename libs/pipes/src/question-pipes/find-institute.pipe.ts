import { inject, Pipe, PipeTransform } from '@angular/core';
import { InstitutesState } from '@simulado/services';

@Pipe({ name: 'findInstitute' })
export class FindInstitutePipe implements PipeTransform {
  private readonly _institutesState = inject(InstitutesState);

  transform(instituteId: string): string {
    const institute = this._institutesState.getById(instituteId);

    if (!institute) {
      return '';
    }

    return institute.acronym;
  }
}
