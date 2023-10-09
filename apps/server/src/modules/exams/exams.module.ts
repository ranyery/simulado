import { Module } from '@nestjs/common';

import { ExamsController } from './exams.controller';
import { IExamsRepository } from './repositories/exams.repository';
import { ExamPrismaRepository } from './repositories/prisma/exam-prisma.repository';
import { CreateExamUseCase } from './useCases/create-exam.usecase';
import { DeleteExamByIdUseCase } from './useCases/delete-exam-by-id.usecase';
import { FindAllExamsUseCase } from './useCases/find-all-exams.usecase';
import { FindExamByIdUseCase } from './useCases/find-exam-by-id.usecase';
import { UpdateExamByIdUseCase } from './useCases/update-exam-by-id.usecase';

@Module({
  imports: [],
  controllers: [ExamsController],
  providers: [
    CreateExamUseCase,
    FindExamByIdUseCase,
    FindAllExamsUseCase,
    UpdateExamByIdUseCase,
    DeleteExamByIdUseCase,
    {
      provide: IExamsRepository,
      useClass: ExamPrismaRepository,
    },
  ],
})
export class ExamsModule {}
