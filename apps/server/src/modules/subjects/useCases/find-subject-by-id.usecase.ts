import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ISubject } from '@simulado/domain';

import { ISubjectsRepository } from '../repositories/subjects.repository';

@Injectable()
export class FindSubjectByIdUseCase {
  constructor(private readonly _subjectsRepository: ISubjectsRepository) {}

  async execute(id: string): Promise<ISubject | null> {
    const subject = await this._subjectsRepository.findById(id);

    if (!subject) {
      throw new HttpException('Subject not found!', HttpStatus.NOT_FOUND);
    }

    return subject;
  }
}
