import { IExam } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';

import { IExamsRepository } from '../repositories/exams.repository';
import { CreateExamRequestDTO } from '../schemas/create-exam.schema';

@Injectable()
export class CreateExamUseCase {
  constructor(private readonly _examsRepository: IExamsRepository) {}

  async execute(data: CreateExamRequestDTO): Promise<IExam> {
    return await this._examsRepository.create(data);
  }
}
