import { inject, Pipe, PipeTransform } from '@angular/core';

import { SubjectsState } from '../../subjects/state/subjects.state';

@Pipe({ name: 'findSubject' })
export class FindSubjectPipe implements PipeTransform {
  private readonly _subjectsState = inject(SubjectsState);

  transform(subjectId: string): string {
    const subject = this._subjectsState.getById(subjectId);

    if (!subject) {
      return '';
    }

    return subject.name;
  }
}
