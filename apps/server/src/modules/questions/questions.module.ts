import { Module } from '@nestjs/common';

import { QuestionsController } from './questions.controller';
import { QuestionsPrismaRepository } from './repositories/prisma/questions-prisma.repository';
import { IQuestionsRepository } from './repositories/questions.repository';
import { CreateQuestionUseCase } from './useCases/create-question.usecase';
import { DeleteQuestionByIdUseCase } from './useCases/delete-question-by-id.usecase';
import { FindAllQuestionsUseCase } from './useCases/find-all-questions.usecase';
import { FindQuestionByIdUseCase } from './useCases/find-question-by-id.usecase';
import { UpdateQuestionByIdUseCase } from './useCases/update-question-by-id.usecase';

@Module({
  imports: [],
  controllers: [QuestionsController],
  providers: [
    FindAllQuestionsUseCase,
    FindQuestionByIdUseCase,
    CreateQuestionUseCase,
    UpdateQuestionByIdUseCase,
    DeleteQuestionByIdUseCase,
    {
      provide: IQuestionsRepository,
      useClass: QuestionsPrismaRepository,
    },
  ],
})
export class QuestionsModule {}
