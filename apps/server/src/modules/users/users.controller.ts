import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../../shared/guards/auth.guard';
import { CreateUserRequestDTO } from './schemas/create-user.schema';
import { UserResponseDTO } from './schemas/user.schema';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { ValidateTokenUseCase } from './useCases/validate-token.usecase';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly _createUserUseCase: CreateUserUseCase,
    private readonly _validateTokenUseCase: ValidateTokenUseCase
  ) {}

  @Post()
  async create(@Body() data: CreateUserRequestDTO) {
    const user = await this._createUserUseCase.execute(data);
    const userDTO = UserResponseDTO.parse(user);
    return userDTO;
  }

  @Post('/validate-token')
  @UseGuards(AuthGuard)
  async profile(@Request() req: Record<string, any>) {
    const userId = req['user']['sub'] as string;
    await this._validateTokenUseCase.execute(userId);
    return { message: 'Access granted' };
  }
}
