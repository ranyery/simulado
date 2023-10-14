import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IQuestion } from '@simulado/domain';

import { IQuestionsRepository } from '../repositories/questions.repository';
import { PartialQuestionRequestDTO } from '../schemas/partial-question.schema';

@Injectable()
export class UpdateQuestionByIdUseCase {
  constructor(private readonly _questionsRepository: IQuestionsRepository) {}

  async execute(id: string, data: PartialQuestionRequestDTO): Promise<IQuestion | null> {
    try {
      return await this._questionsRepository.updateById(id, data);
    } catch {
      throw new HttpException('Question does not exist!', HttpStatus.BAD_REQUEST);
    }
  }
}
