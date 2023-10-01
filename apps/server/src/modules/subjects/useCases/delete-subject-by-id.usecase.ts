import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ISubjectsRepository } from '../repositories/subjects.repository';

@Injectable()
export class DeleteSubjectByIdUseCase {
  constructor(private readonly _subjectsRepository: ISubjectsRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this._subjectsRepository.deleteById(id);
    } catch (error: any) {
      if (error?.code === 'P2003') {
        throw new HttpException(
          'Deletion of this entity is not possible due to its associations with other entities.',
          HttpStatus.BAD_REQUEST
        );
      }

      throw new HttpException(
        'An error occurred while deleting the entity.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
