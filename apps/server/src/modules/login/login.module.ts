import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserPrismaRepository } from '../users/repositories/prisma/user-prisma.repository';
import { IUsersRepository } from '../users/repositories/users.repository';
import { LoginController } from './login.controller';
import { SignInUseCase } from './useCases/sign-in.usecase';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'NESTJS',
      signOptions: {
        expiresIn: '8h',
      },
    }),
  ],
  controllers: [LoginController],
  providers: [
    SignInUseCase,
    {
      provide: IUsersRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class LoginModule {}
