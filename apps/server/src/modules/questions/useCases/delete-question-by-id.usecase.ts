import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { IQuestionsRepository } from '../repositories/questions.repository';

@Injectable()
export class DeleteQuestionByIdUseCase {
  constructor(private readonly _questionsRepository: IQuestionsRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this._questionsRepository.deleteById(id);
    } catch {
      throw new HttpException('Question does not exist!', HttpStatus.BAD_REQUEST);
    }
  }
}
