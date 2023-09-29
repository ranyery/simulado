import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../../shared/guards/auth.guard';
import { SignInRequestDTO } from './schemas/sign-in.schema';
import { RefreshTokenUseCase } from './useCases/refresh-token.usecase';
import { SignInUseCase } from './useCases/sign-in.usecase';
import { ValidateTokenUseCase } from './useCases/validate-token.usecase';

@Controller()
export class LoginController {
  constructor(
    private readonly _signInUseCase: SignInUseCase,
    private readonly _validateTokenUseCase: ValidateTokenUseCase,
    private readonly _refreshTokenUseCase: RefreshTokenUseCase
  ) {}

  @Post('/login')
  async login(@Body() signInDTO: SignInRequestDTO) {
    const token = await this._signInUseCase.execute(signInDTO);
    return { access_token: token };
  }

  @Post('/validate-token')
  @UseGuards(AuthGuard)
  async validateToken(@Request() req: Record<string, any>) {
    const userId = req['user']['sub'] as string;
    await this._validateTokenUseCase.execute(userId);
    return { message: 'Valid token. Access granted.' };
  }

  @Post('/refresh-token')
  @UseGuards(AuthGuard)
  async refreshToken(@Request() req: Record<string, any>) {
    const userId = req['user']['sub'] as string;
    const token = await this._refreshTokenUseCase.execute(userId);
    return { access_token: token };
  }
}
