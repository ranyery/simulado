import { Injectable } from '@nestjs/common';
import { IInstitute } from '@simulado/domain';

import { IInstitutesRepository } from '../repositories/institutes.repository';

@Injectable()
export class FindAllInstitutesUseCase {
  constructor(private readonly _institutesRepository: IInstitutesRepository) {}

  async execute(): Promise<IInstitute[]> {
    return this._institutesRepository.findAll();
  }
}
