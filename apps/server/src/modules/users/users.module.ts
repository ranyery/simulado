import { Module } from '@nestjs/common';

import { PrismaService } from '../../infra/database/prisma.service';
import { UserPrismaRepository } from './repositories/prisma/user-prisma.repository';
import { IUsersRepository } from './repositories/users.repository';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { ValidateTokenUseCase } from './useCases/validate-token.usecase';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    ValidateTokenUseCase,
    {
      provide: IUsersRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UsersModule {}
