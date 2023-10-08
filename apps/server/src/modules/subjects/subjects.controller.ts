import { EUserRole } from '@libs/shared/domain';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { Auth } from '../../shared/decorators/auth.decorator';
import { CreateSubjectRequestDTO } from './schemas/create-subject.schema';
import { PartialSubjectRequestDTO } from './schemas/partial-subject.schema';
import { SubjectResponseDTO } from './schemas/subject.schema';
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
    const subjects = await this._findAllSubjectsUseCase.execute();
    const subjectsDTO = subjects.map((subject) => SubjectResponseDTO.parse(subject));
    return subjectsDTO;
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const subject = await this._findSubjectByIdUseCase.execute(id);
    const subjectDTO = SubjectResponseDTO.parse(subject);
    return subjectDTO;
  }

  @Post()
  @Auth(EUserRole.ADMIN)
  async create(@Body() data: CreateSubjectRequestDTO) {
    const subject = await this._createSubjectUseCase.execute(data);
    const subjectDTO = SubjectResponseDTO.parse(subject);
    return subjectDTO;
  }

  @Put('/:id')
  @Auth(EUserRole.ADMIN)
  async updateById(@Param('id') id: string, @Body() data: PartialSubjectRequestDTO) {
    const subject = await this._updateSubjectByIdUseCase.execute(id, data);
    const subjectDTO = SubjectResponseDTO.parse(subject);
    return subjectDTO;
  }

  @Delete('/:id')
  @Auth(EUserRole.ADMIN)
  async deleteById(@Param('id') id: string): Promise<void> {
    await this._deleteSubjectByIdUseCase.execute(id);
  }
}
