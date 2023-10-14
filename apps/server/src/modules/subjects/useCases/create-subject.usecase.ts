import { Injectable } from '@nestjs/common';
import { ISubject } from '@simulado/domain';

import { ISubjectsRepository } from '../repositories/subjects.repository';
import { CreateSubjectRequestDTO } from '../schemas/create-subject.schema';

@Injectable()
export class CreateSubjectUseCase {
  constructor(private readonly _subjectsRepository: ISubjectsRepository) {}

  async execute(data: CreateSubjectRequestDTO): Promise<ISubject> {
    return await this._subjectsRepository.create(data);
  }
}
