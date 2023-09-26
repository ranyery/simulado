import { IQuestion } from '@libs/shared/domain';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { IQuestionsRepository } from '../repositories/questions.repository';

@Injectable()
export class FindQuestionByIdUseCase {
  constructor(private readonly _questionsRepository: IQuestionsRepository) {}

  async execute(id: string): Promise<IQuestion | null> {
    const question = await this._questionsRepository.findById(id);

    if (!question) {
      throw new HttpException('Question not found!', HttpStatus.NOT_FOUND);
    }

    return question;
  }
}
