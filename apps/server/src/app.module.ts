import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

import { PrismaModule } from './infra/database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ExamsModule } from './modules/exams/exams.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { TopicsModule } from './modules/topics/topics.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    SubjectsModule,
    TopicsModule,
    QuestionsModule,
    ExamsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
