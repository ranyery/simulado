import { Body, Controller, Post } from '@nestjs/common';

import { SignInDTO } from './dto/sign-in.dto';
import { SignInUseCase } from './useCases/sign-in.usecase';

@Controller()
export class LoginController {
  constructor(private readonly _signInUseCase: SignInUseCase) {}

  @Post('/login')
  async login(@Body() signInDTO: SignInDTO) {
    const token = await this._signInUseCase.execute(signInDTO);
    return token;
  }
}
