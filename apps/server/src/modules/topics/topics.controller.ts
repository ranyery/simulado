import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EUserRole } from '@simulado/domain';

import { Auth } from '../../shared/decorators/auth.decorator';
import { CreateTopicRequestDTO } from './schemas/create-topic.schema';
import { PartialTopicRequestDTO } from './schemas/partial-topic.schema';
import { TopicResponseDTO } from './schemas/topic.schema';
import { CreateTopicUseCase } from './useCases/create-topic.usecase';
import { DeleteTopicByIdUseCase } from './useCases/delete-topic-by-id.usecase';
import { FindAllTopicsUseCase } from './useCases/find-all-topics.usecase';
import { FindTopicByIdUseCase } from './useCases/find-topic-by-id.usecase';
import { UpdateTopicByIdUseCase } from './useCases/update-topic-by-id.usecase';

@Controller('/topics')
export class TopicsController {
  constructor(
    private readonly _findAllTopicsUseCase: FindAllTopicsUseCase,
    private readonly _findTopicByIdUseCase: FindTopicByIdUseCase,
    private readonly _createTopicUseCase: CreateTopicUseCase,
    private readonly _updateTopicByIdUseCase: UpdateTopicByIdUseCase,
    private readonly _deleteTopicByIdUseCase: DeleteTopicByIdUseCase
  ) {}

  @Get()
  async getAll() {
    const topics = await this._findAllTopicsUseCase.execute();
    const topicsDTO = topics.map((topic) => TopicResponseDTO.parse(topic));
    return topicsDTO;
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const topic = await this._findTopicByIdUseCase.execute(id);
    const topicDTO = TopicResponseDTO.parse(topic);
    return topicDTO;
  }

  @Post()
  @Auth(EUserRole.ADMIN)
  async create(@Body() data: CreateTopicRequestDTO) {
    const topic = await this._createTopicUseCase.execute(data);
    const topicDTO = TopicResponseDTO.parse(topic);
    return topicDTO;
  }

  @Put('/:id')
  @Auth(EUserRole.ADMIN)
  async updateById(@Param('id') id: string, @Body() data: PartialTopicRequestDTO) {
    const topic = await this._updateTopicByIdUseCase.execute(id, data);
    const topicDTO = TopicResponseDTO.parse(topic);
    return topicDTO;
  }

  @Delete('/:id')
  @Auth(EUserRole.ADMIN)
  async deleteById(@Param('id') id: string): Promise<void> {
    await this._deleteTopicByIdUseCase.execute(id);
  }
}
