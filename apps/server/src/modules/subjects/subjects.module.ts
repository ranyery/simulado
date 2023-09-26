import { Module } from '@nestjs/common';

import { PrismaService } from '../../infra/database/prisma.service';
import { SubjectsPrismaRepository } from './repositories/prisma/subjects-prisma.repository';
import { ISubjectsRepository } from './repositories/subjects.repository';
import { SubjectsController } from './subjects.controller';
import { CreateSubjectUseCase } from './useCases/create-subject.usecase';
import { DeleteSubjectByIdUseCase } from './useCases/delete-subject-by-id.usecase';
import { FindAllSubjectsUseCase } from './useCases/find-all-subjects.usecase';
import { FindSubjectByIdUseCase } from './useCases/find-subject-by-id.usecase';
import { UpdateSubjectByIdUseCase } from './useCases/update-subject-by-id.usecase';

@Module({
  imports: [],
  controllers: [SubjectsController],
  providers: [
    PrismaService,
    FindAllSubjectsUseCase,
    FindSubjectByIdUseCase,
    CreateSubjectUseCase,
    UpdateSubjectByIdUseCase,
    DeleteSubjectByIdUseCase,
    {
      provide: ISubjectsRepository,
      useClass: SubjectsPrismaRepository,
    },
  ],
})
export class SubjectsModule {}
