import { ITopic } from '@libs/shared/domain';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ITopicsRepository } from '../repositories/topics.repository';

@Injectable()
export class FindTopicByIdUseCase {
  constructor(private readonly _topicsRepository: ITopicsRepository) {}

  async execute(id: string): Promise<ITopic | null> {
    const topic = await this._topicsRepository.findById(id);

    if (!topic) {
      throw new HttpException('Topic not found!', HttpStatus.NOT_FOUND);
    }

    return topic;
  }
}
