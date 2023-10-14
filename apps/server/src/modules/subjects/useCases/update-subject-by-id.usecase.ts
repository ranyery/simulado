import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ISubject } from '@simulado/domain';

import { ISubjectsRepository } from '../repositories/subjects.repository';
import { PartialSubjectRequestDTO } from '../schemas/partial-subject.schema';

@Injectable()
export class UpdateSubjectByIdUseCase {
  constructor(private readonly _subjectsRepository: ISubjectsRepository) {}

  async execute(id: string, data: PartialSubjectRequestDTO): Promise<ISubject | null> {
    try {
      return await this._subjectsRepository.updateById(id, data);
    } catch {
      throw new HttpException('Subject does not exist!', HttpStatus.BAD_REQUEST);
    }
  }
}
