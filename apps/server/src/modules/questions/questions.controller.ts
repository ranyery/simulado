import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { EUserRole } from '@simulado/domain';

import { Auth } from '../../shared/decorators/auth.decorator';
import { QueryParamsRequestDTO } from '../../shared/schemas/query-params.schema';
import { CreateQuestionRequestDTO } from './schemas/create-question.schema';
import { PartialQuestionRequestDTO } from './schemas/partial-question.schema';
import { QuestionResponseDTO } from './schemas/question.schema';
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
  async getAll(@Query() query: QueryParamsRequestDTO) {
    const questions = await this._findAllQuestionsUseCase.execute(query);
    const questionsDTO = questions.map((question) => QuestionResponseDTO.parse(question));
    return questionsDTO;
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const question = await this._findQuestionByIdUseCase.execute(id);
    const questionDTO = QuestionResponseDTO.parse(question);
    return questionDTO;
  }

  @Post()
  @Auth(EUserRole.ADMIN)
  async create(@Body() data: CreateQuestionRequestDTO) {
    return await this._createQuestionUseCase.execute(data);
  }

  @Put('/:id')
  @Auth(EUserRole.ADMIN)
  async updateById(@Param('id') id: string, @Body() data: PartialQuestionRequestDTO) {
    return await this._updateQuestionByIdUseCase.execute(id, data);
  }

  @Delete('/:id')
  @Auth(EUserRole.ADMIN)
  async deleteById(@Param('id') id: string): Promise<void> {
    await this._deleteQuestionByIdUseCase.execute(id);
  }
}
