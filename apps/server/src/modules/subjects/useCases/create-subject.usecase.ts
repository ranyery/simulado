import { ISubject } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';

import { ISubjectsRepository } from '../repositories/subjects.repository';
import { PartialSubjectRequestDTO } from '../schemas/partial-subject.schema';

@Injectable()
export class CreateSubjectUseCase {
  constructor(private readonly _subjectsRepository: ISubjectsRepository) {}

  async execute(data: PartialSubjectRequestDTO): Promise<ISubject> {
    return await this._subjectsRepository.create(data);
  }
}
