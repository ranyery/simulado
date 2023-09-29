import { Module } from '@nestjs/common';

import { ValidateTokenUseCase } from '../login/useCases/validate-token.usecase';
import { UserPrismaRepository } from './repositories/prisma/user-prisma.repository';
import { IUsersRepository } from './repositories/users.repository';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    ValidateTokenUseCase,
    {
      provide: IUsersRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UsersModule {}
