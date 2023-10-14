import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IInstitute } from '@simulado/domain';

import { IInstitutesRepository } from '../repositories/institutes.repository';
import { PartialInstituteRequestDTO } from '../schemas/partial-institute.schema';

@Injectable()
export class UpdateInstituteByIdUseCase {
  constructor(private readonly _institutesRepository: IInstitutesRepository) {}

  async execute(id: string, data: PartialInstituteRequestDTO): Promise<IInstitute | null> {
    try {
      return this._institutesRepository.updateById(id, data);
    } catch {
      throw new HttpException('Institute does not exist!', HttpStatus.BAD_REQUEST);
    }
  }
}
