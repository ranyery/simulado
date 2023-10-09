import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { IExamsRepository } from '../repositories/exams.repository';

@Injectable()
export class DeleteExamByIdUseCase {
  constructor(private readonly _examsRepository: IExamsRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this._examsRepository.deleteById(id);
    } catch {
      throw new HttpException('Exam does not exist!', HttpStatus.BAD_REQUEST);
    }
  }
}
