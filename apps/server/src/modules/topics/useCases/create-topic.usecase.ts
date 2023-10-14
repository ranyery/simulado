import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ITopic } from '@simulado/domain';

import { ISubjectsRepository } from '../../subjects/repositories/subjects.repository';
import { ITopicsRepository } from '../repositories/topics.repository';
import { CreateTopicRequestDTO } from '../schemas/create-topic.schema';

@Injectable()
export class CreateTopicUseCase {
  constructor(
    private readonly _topicsRepository: ITopicsRepository,
    private readonly _subjectsRepository: ISubjectsRepository
  ) {}

  async execute(data: CreateTopicRequestDTO): Promise<ITopic> {
    const { subjectId } = data;
    const subject = await this._subjectsRepository.findById(subjectId);

    if (!subject) {
      throw new HttpException(
        'No Subject was found with the provided Id. Please check the subjectId and proceed with your Topic registration.',
        HttpStatus.BAD_REQUEST
      );
    }

    return await this._topicsRepository.create(data);
  }
}
