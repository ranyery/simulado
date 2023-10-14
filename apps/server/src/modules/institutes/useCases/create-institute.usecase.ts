import { Injectable } from '@nestjs/common';
import { IInstitute } from '@simulado/domain';

import { IInstitutesRepository } from '../repositories/institutes.repository';
import { CreateInstituteRequestDTO } from '../schemas/create-institute.schema';

@Injectable()
export class CreateInstituteUseCase {
  constructor(private readonly _institutesRepository: IInstitutesRepository) {}

  async execute(data: CreateInstituteRequestDTO): Promise<IInstitute> {
    return this._institutesRepository.create(data);
  }
}
