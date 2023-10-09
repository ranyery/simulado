import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { IInstitutesRepository } from '../repositories/institutes.repository';

@Injectable()
export class DeleteInstituteByIdUseCase {
  constructor(private readonly _institutesRepository: IInstitutesRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this._institutesRepository.deleteById(id);
    } catch {
      throw new HttpException('Institute does not exist!', HttpStatus.BAD_REQUEST);
    }
  }
}
