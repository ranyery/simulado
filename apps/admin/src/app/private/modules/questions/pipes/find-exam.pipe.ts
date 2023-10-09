import { inject, Pipe, PipeTransform } from '@angular/core';

import { ExamsState } from '../../exams/state/exams.state';

@Pipe({ name: 'findExam' })
export class FindExamPipe implements PipeTransform {
  private readonly _examsState = inject(ExamsState);

  transform(examId: string): string {
    const exam = this._examsState.getById(examId);

    if (!exam) {
      return '';
    }

    return exam.acronym;
  }
}
