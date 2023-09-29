import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../../shared/guards/auth.guard';
import { CreateQuestionRequestDTO } from './schemas/create-question.schema';
import { PartialQuestionRequestDTO } from './schemas/partial-question.schema';
import { CreateQuestionUseCase } from './useCases/create-question.usecase';
import { DeleteQuestionByIdUseCase } from './useCases/delete-question-by-id.usecase';
import { FindAllQuestionsUseCase } from './useCases/find-all-questions.usecase';
import { FindQuestionByIdUseCase } from './useCases/find-question-by-id.usecase';
import { UpdateQuestionByIdUseCase } from './useCases/update-question-by-id.usecase';

@Controller('/questions')
export class QuestionsController {
  constructor(
    private readonly _findAllQuestionsUseCase: FindAllQuestionsUseCase,
    private readonly _findQuestionByIdUseCase: FindQuestionByIdUseCase,
    private readonly _createQuestionUseCase: CreateQuestionUseCase,
    private readonly _updateQuestionByIdUseCase: UpdateQuestionByIdUseCase,
    private readonly _deleteQuestionByIdUseCase: DeleteQuestionByIdUseCase
  ) {}

  @Get()
  async getAll() {
    // TODO: Adicionar lógica de paginação => 'top', 'skip', etc
    return await this._findAllQuestionsUseCase.execute();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this._findQuestionByIdUseCase.execute(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() data: CreateQuestionRequestDTO) {
    return await this._createQuestionUseCase.execute(data);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async updateById(@Param('id') id: string, @Body() data: PartialQuestionRequestDTO) {
    return await this._updateQuestionByIdUseCase.execute(id, data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteById(@Param('id') id: string): Promise<void> {
    await this._deleteQuestionByIdUseCase.execute(id);
  }
}
