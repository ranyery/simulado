import { Body, Controller, Post } from '@nestjs/common';

import { SignInRequestDTO } from './schemas/sign-in.schema';
import { SignInUseCase } from './useCases/sign-in.usecase';

@Controller()
export class LoginController {
  constructor(private readonly _signInUseCase: SignInUseCase) {}

  @Post('/login')
  async login(@Body() signInDTO: SignInRequestDTO) {
    const token = await this._signInUseCase.execute(signInDTO);
    return token;
  }
}
