import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ITopic } from '@simulado/domain';

import { ITopicsRepository } from '../repositories/topics.repository';
import { PartialTopicRequestDTO } from '../schemas/partial-topic.schema';

@Injectable()
export class UpdateTopicByIdUseCase {
  constructor(private readonly _topicsRepository: ITopicsRepository) {}

  async execute(id: string, data: PartialTopicRequestDTO): Promise<ITopic | null> {
    try {
      return await this._topicsRepository.updateById(id, data);
    } catch {
      throw new HttpException('Topic does not exist!', HttpStatus.BAD_REQUEST);
    }
  }
}
