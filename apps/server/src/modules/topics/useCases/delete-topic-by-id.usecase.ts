import { ITopic } from '@libs/shared/domain';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ITopicsRepository } from '../repositories/topics.repository';

@Injectable()
export class DeleteTopicByIdUseCase {
  constructor(private readonly _topicsRepository: ITopicsRepository) {}

  async execute(id: string): Promise<ITopic | null> {
    try {
      await this._topicsRepository.deleteById(id);
      return null;
    } catch {
      throw new HttpException('Topic does not exist!', HttpStatus.BAD_REQUEST);
    }
  }
}
