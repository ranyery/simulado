import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../../shared/guards/auth.guard';
import { PartialSubjectRequestDTO } from './schemas/partial-subject.schema';
import { CreateSubjectUseCase } from './useCases/create-subject.usecase';
import { DeleteSubjectByIdUseCase } from './useCases/delete-subject-by-id.usecase';
import { FindAllSubjectsUseCase } from './useCases/find-all-subjects.usecase';
import { FindSubjectByIdUseCase } from './useCases/find-subject-by-id.usecase';
import { UpdateSubjectByIdUseCase } from './useCases/update-subject-by-id.usecase';

@Controller('/subjects')
export class SubjectsController {
  constructor(
    private readonly _findAllSubjectsUseCase: FindAllSubjectsUseCase,
    private readonly _findSubjectByIdUseCase: FindSubjectByIdUseCase,
    private readonly _createSubjectUseCase: CreateSubjectUseCase,
    private readonly _updateSubjectByIdUseCase: UpdateSubjectByIdUseCase,
    private readonly _deleteSubjectByIdUseCase: DeleteSubjectByIdUseCase
  ) {}

  @Get()
  async getAll() {
    return await this._findAllSubjectsUseCase.execute();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this._findSubjectByIdUseCase.execute(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async save(@Body() data: PartialSubjectRequestDTO) {
    return await this._createSubjectUseCase.execute(data);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async updateById(@Param('id') id: string, @Body() data: PartialSubjectRequestDTO) {
    // TODO: Se não passar o 'name', retorna status 400
    return await this._updateSubjectByIdUseCase.execute(id, data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteById(@Param('id') id: string) {
    return await this._deleteSubjectByIdUseCase.execute(id);
  }
}
