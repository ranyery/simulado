import { Module } from '@nestjs/common';

import { SubjectsPrismaRepository } from '../subjects/repositories/prisma/subjects-prisma.repository';
import { ISubjectsRepository } from '../subjects/repositories/subjects.repository';
import { TopicsPrismaRepository } from './repositories/prisma/topics-prisma.repository';
import { ITopicsRepository } from './repositories/topics.repository';
import { TopicsController } from './topics.controller';
import { CreateTopicUseCase } from './useCases/create-topic.usecase';
import { DeleteTopicByIdUseCase } from './useCases/delete-topic-by-id.usecase';
import { FindAllTopicsUseCase } from './useCases/find-all-topics.usecase';
import { FindTopicByIdUseCase } from './useCases/find-topic-by-id.usecase';
import { UpdateTopicByIdUseCase } from './useCases/update-topic-by-id.usecase';

@Module({
  imports: [],
  controllers: [TopicsController],
  providers: [
    FindAllTopicsUseCase,
    FindTopicByIdUseCase,
    CreateTopicUseCase,
    UpdateTopicByIdUseCase,
    DeleteTopicByIdUseCase,
    {
      provide: ITopicsRepository,
      useClass: TopicsPrismaRepository,
    },
    {
      provide: ISubjectsRepository,
      useClass: SubjectsPrismaRepository,
    },
  ],
})
export class TopicsModule {}
