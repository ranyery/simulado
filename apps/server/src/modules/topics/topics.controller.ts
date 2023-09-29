import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../../shared/guards/auth.guard';
import { CreateTopicRequestDTO } from './schemas/create-topic.schema';
import { PartialTopicRequestDTO } from './schemas/partial-topic.schema';
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
    return await this._findAllTopicsUseCase.execute();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this._findTopicByIdUseCase.execute(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() data: CreateTopicRequestDTO) {
    return await this._createTopicUseCase.execute(data);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async updateById(@Param('id') id: string, @Body() data: PartialTopicRequestDTO) {
    return await this._updateTopicByIdUseCase.execute(id, data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteById(@Param('id') id: string): Promise<void> {
    await this._deleteTopicByIdUseCase.execute(id);
  }
}
