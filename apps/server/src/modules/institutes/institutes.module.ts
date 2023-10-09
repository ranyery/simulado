import { Module } from '@nestjs/common';

import { InstitutesController } from './institutes.controller';
import { IInstitutesRepository } from './repositories/institutes.repository';
import { InstitutePrismaRepository } from './repositories/prisma/institute-prisma.repository';
import { CreateInstituteUseCase } from './useCases/create-institute.usecase';
import { DeleteInstituteByIdUseCase } from './useCases/delete-institute-by-id.usecase';
import { FindAllInstitutesUseCase } from './useCases/find-all-institutes.usecase';
import { FindInstituteByIdUseCase } from './useCases/find-institute-by-id.usecase';
import { UpdateInstituteByIdUseCase } from './useCases/update-institute-by-id.usecase';

@Module({
  imports: [],
  controllers: [InstitutesController],
  providers: [
    CreateInstituteUseCase,
    FindInstituteByIdUseCase,
    FindAllInstitutesUseCase,
    UpdateInstituteByIdUseCase,
    DeleteInstituteByIdUseCase,
    {
      provide: IInstitutesRepository,
      useClass: InstitutePrismaRepository,
    },
  ],
})
export class InstitutesModule {}
