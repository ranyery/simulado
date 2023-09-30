import { inject, Pipe, PipeTransform } from '@angular/core';

import { SubjectsState } from '../../subjects/state/subjects.state';

@Pipe({ name: 'findSubjectById' })
export class FindSubjectByIdPipe implements PipeTransform {
  private readonly _subjectsState = inject(SubjectsState);

  transform(subjectId: string): string | undefined {
    const subjects = this._subjectsState.get();
    const selectedSubject = subjects.find((subject) => subject.id === subjectId);
    return selectedSubject?.name;
  }
}
