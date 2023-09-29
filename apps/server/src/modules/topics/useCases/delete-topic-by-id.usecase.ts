import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ITopicsRepository } from '../repositories/topics.repository';

@Injectable()
export class DeleteTopicByIdUseCase {
  constructor(private readonly _topicsRepository: ITopicsRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this._topicsRepository.deleteById(id);
    } catch {
      throw new HttpException('Topic does not exist!', HttpStatus.BAD_REQUEST);
    }
  }
}
