import { IExam } from '@libs/shared/domain';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { IExamsRepository } from '../repositories/exams.repository';
import { PartialExamRequestDTO } from '../schemas/partial-exam.schema';

@Injectable()
export class UpdateExamByIdUseCase {
  constructor(private readonly _examsRepository: IExamsRepository) {}

  async execute(id: string, data: PartialExamRequestDTO): Promise<IExam | null> {
    try {
      return this._examsRepository.updateById(id, data);
    } catch {
      throw new HttpException('Exam does not exist!', HttpStatus.BAD_REQUEST);
    }
  }
}
