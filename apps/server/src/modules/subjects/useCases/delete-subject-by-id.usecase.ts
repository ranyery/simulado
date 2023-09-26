import { ISubject } from '@libs/shared/domain';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ISubjectsRepository } from '../repositories/subjects.repository';

@Injectable()
export class DeleteSubjectByIdUseCase {
  constructor(private readonly _subjectsRepository: ISubjectsRepository) {}

  async execute(id: string): Promise<ISubject | null> {
    try {
      await this._subjectsRepository.deleteById(id);
      return null;
    } catch {
      throw new HttpException('Subject does not exist!', HttpStatus.BAD_REQUEST);
    }
  }
}
