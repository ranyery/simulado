import { Module } from '@nestjs/common';

import { PrismaService } from '../../infra/database/prisma.service';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService, CreateUserUseCase],
})
export class UsersModule {}
