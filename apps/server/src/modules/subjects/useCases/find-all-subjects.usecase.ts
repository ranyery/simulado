import { ISubject } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';

import { ISubjectsRepository } from '../repositories/subjects.repository';

@Injectable()
export class FindAllSubjectsUseCase {
  constructor(private readonly _subjectsRepository: ISubjectsRepository) {}

  async execute(): Promise<ISubject[]> {
    return await this._subjectsRepository.findAll();
  }
}
