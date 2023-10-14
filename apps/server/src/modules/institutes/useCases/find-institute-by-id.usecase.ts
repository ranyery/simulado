import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IInstitute } from '@simulado/domain';

import { IInstitutesRepository } from '../repositories/institutes.repository';

@Injectable()
export class FindInstituteByIdUseCase {
  constructor(private readonly _institutesRepository: IInstitutesRepository) {}

  async execute(id: string): Promise<IInstitute | null> {
    const institute = await this._institutesRepository.findById(id);

    if (!institute) {
      throw new HttpException('Institute not found!', HttpStatus.NOT_FOUND);
    }

    return institute;
  }
}
