import { IExam } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';

import { IExamsRepository } from '../repositories/exams.repository';

@Injectable()
export class FindAllExamsUseCase {
  constructor(private readonly _examsRepository: IExamsRepository) {}

  async execute(): Promise<IExam[]> {
    return this._examsRepository.findAll();
  }
}
