import { Injectable } from '@nestjs/common';
import { ITopic } from '@simulado/domain';

import { ITopicsRepository } from '../repositories/topics.repository';

@Injectable()
export class FindAllTopicsUseCase {
  constructor(private readonly _topicsRepository: ITopicsRepository) {}

  async execute(): Promise<ITopic[]> {
    return await this._topicsRepository.findAll();
  }
}
