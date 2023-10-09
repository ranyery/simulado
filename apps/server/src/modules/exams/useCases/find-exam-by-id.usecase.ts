import { IExam } from '@libs/shared/domain';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { IExamsRepository } from '../repositories/exams.repository';

@Injectable()
export class FindExamByIdUseCase {
  constructor(private readonly _examsRepository: IExamsRepository) {}

  async execute(id: string): Promise<IExam | null> {
    const exam = await this._examsRepository.findById(id);

    if (!exam) {
      throw new HttpException('Exam not found!', HttpStatus.NOT_FOUND);
    }

    return exam;
  }
}
