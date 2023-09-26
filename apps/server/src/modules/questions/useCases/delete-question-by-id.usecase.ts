import { IQuestion } from '@libs/shared/domain';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { IQuestionsRepository } from '../repositories/questions.repository';

@Injectable()
export class DeleteQuestionByIdUseCase {
  constructor(private readonly _questionsRepository: IQuestionsRepository) {}

  async execute(id: string): Promise<IQuestion | null> {
    try {
      await this._questionsRepository.deleteById(id);
      return null;
    } catch {
      throw new HttpException('Question does not exist!', HttpStatus.BAD_REQUEST);
    }
  }
}
