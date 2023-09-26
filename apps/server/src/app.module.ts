import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

import { LoginModule } from './modules/login/login.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule, LoginModule, SubjectsModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
