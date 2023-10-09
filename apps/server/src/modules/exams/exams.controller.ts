import { EUserRole } from '@libs/shared/domain';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { Auth } from '../../shared/decorators/auth.decorator';
import { CreateExamRequestDTO } from './schemas/create-exam.schema';
import { ExamResponseDTO } from './schemas/exam.schema';
import { PartialExamRequestDTO } from './schemas/partial-exam.schema';
import { CreateExamUseCase } from './useCases/create-exam.usecase';
import { DeleteExamByIdUseCase } from './useCases/delete-exam-by-id.usecase';
import { FindAllExamsUseCase } from './useCases/find-all-exams.usecase';
import { FindExamByIdUseCase } from './useCases/find-exam-by-id.usecase';
import { UpdateExamByIdUseCase } from './useCases/update-exam-by-id.usecase';

@Controller('/exams')
export class ExamsController {
  constructor(
    private readonly _findAllExamsUseCase: FindAllExamsUseCase,
    private readonly _findExamByIdUseCase: FindExamByIdUseCase,
    private readonly _createExamUseCase: CreateExamUseCase,
    private readonly _updateExamByIdUseCase: UpdateExamByIdUseCase,
    private readonly _deleteExamByIdUseCase: DeleteExamByIdUseCase
  ) {}

  @Get()
  async getAll() {
    const exams = await this._findAllExamsUseCase.execute();
    const examsDTO = exams.map((exam) => ExamResponseDTO.parse(exam));
    return examsDTO;
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const exam = await this._findExamByIdUseCase.execute(id);
    const examDTO = ExamResponseDTO.parse(exam);
    return examDTO;
  }

  @Post()
  @Auth(EUserRole.ADMIN)
  async create(@Body() data: CreateExamRequestDTO) {
    const exam = await this._createExamUseCase.execute(data);
    const examDTO = ExamResponseDTO.parse(exam);
    return examDTO;
  }

  @Put('/:id')
  @Auth(EUserRole.ADMIN)
  async updateById(@Param('id') id: string, @Body() data: PartialExamRequestDTO) {
    const exam = await this._updateExamByIdUseCase.execute(id, data);
    const examDTO = ExamResponseDTO.parse(exam);
    return examDTO;
  }

  @Delete('/:id')
  @Auth(EUserRole.ADMIN)
  async deleteById(@Param('id') id: string): Promise<void> {
    await this._deleteExamByIdUseCase.execute(id);
  }
}
