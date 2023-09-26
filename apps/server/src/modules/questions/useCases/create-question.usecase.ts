import { IQuestion } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';

import { IQuestionsRepository } from '../repositories/questions.repository';
import { CreateQuestionRequestDTO } from '../schemas/create-question.schema';

@Injectable()
export class CreateQuestionUseCase {
  constructor(private readonly _questionsRepository: IQuestionsRepository) {}

  async execute(data: CreateQuestionRequestDTO): Promise<IQuestion> {
    return await this._questionsRepository.create(data);
  }
}
