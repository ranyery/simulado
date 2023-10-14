import { Injectable } from '@nestjs/common';
import { IQueryParams, IQuestion } from '@simulado/domain';

import { IQuestionsRepository } from '../repositories/questions.repository';

@Injectable()
export class FindAllQuestionsUseCase {
  constructor(private readonly _questionsRepository: IQuestionsRepository) {}

  async execute(query: IQueryParams): Promise<IQuestion[]> {
    return await this._questionsRepository.findAll(query);
  }
}
