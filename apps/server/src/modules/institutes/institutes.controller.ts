import { EUserRole } from '@libs/shared/domain';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { Auth } from '../../shared/decorators/auth.decorator';
import { CreateInstituteRequestDTO } from './schemas/create-institute.schema';
import { InstituteResponseDTO } from './schemas/institute.schema';
import { PartialInstituteRequestDTO } from './schemas/partial-institute.schema';
import { CreateInstituteUseCase } from './useCases/create-institute.usecase';
import { DeleteInstituteByIdUseCase } from './useCases/delete-institute-by-id.usecase';
import { FindAllInstitutesUseCase } from './useCases/find-all-institutes.usecase';
import { FindInstituteByIdUseCase } from './useCases/find-institute-by-id.usecase';
import { UpdateInstituteByIdUseCase } from './useCases/update-institute-by-id.usecase';

@Controller('/institutes')
export class InstitutesController {
  constructor(
    private readonly _findAllInstitutesUseCase: FindAllInstitutesUseCase,
    private readonly _findInstituteByIdUseCase: FindInstituteByIdUseCase,
    private readonly _createInstituteUseCase: CreateInstituteUseCase,
    private readonly _updateInstituteByIdUseCase: UpdateInstituteByIdUseCase,
    private readonly _deleteInstituteByIdUseCase: DeleteInstituteByIdUseCase
  ) {}

  @Get()
  async getAll() {
    const institutes = await this._findAllInstitutesUseCase.execute();
    const institutesDTO = institutes.map((institute) => InstituteResponseDTO.parse(institute));
    return institutesDTO;
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const institute = await this._findInstituteByIdUseCase.execute(id);
    const instituteDTO = InstituteResponseDTO.parse(institute);
    return instituteDTO;
  }

  @Post()
  @Auth(EUserRole.ADMIN)
  async create(@Body() data: CreateInstituteRequestDTO) {
    const institute = await this._createInstituteUseCase.execute(data);
    const instituteDTO = InstituteResponseDTO.parse(institute);
    return instituteDTO;
  }

  @Put('/:id')
  @Auth(EUserRole.ADMIN)
  async updateById(@Param('id') id: string, @Body() data: PartialInstituteRequestDTO) {
    const institute = await this._updateInstituteByIdUseCase.execute(id, data);
    const instituteDTO = InstituteResponseDTO.parse(institute);
    return instituteDTO;
  }

  @Delete('/:id')
  @Auth(EUserRole.ADMIN)
  async deleteById(@Param('id') id: string): Promise<void> {
    await this._deleteInstituteByIdUseCase.execute(id);
  }
}
