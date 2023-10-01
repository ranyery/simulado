import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserPrismaRepository } from '../users/repositories/prisma/user-prisma.repository';
import { IUsersRepository } from '../users/repositories/users.repository';
import { AuthController } from './auth.controller';
import { secret } from './constants/jwt';
import { TokenService } from './services/token.service';
import { LoginUseCase } from './useCases/login.usecase';
import { RefreshTokenUseCase } from './useCases/refresh-token.usecase';
import { ValidateTokenUseCase } from './useCases/validate-token.usecase';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: secret,
      signOptions: {
        expiresIn: '168h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    RefreshTokenUseCase,
    ValidateTokenUseCase,
    TokenService,
    {
      provide: IUsersRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class AuthModule {}
