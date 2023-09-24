import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../../shared/guards/auth.guard';
import { CreateUserSchemaDTO } from './schemas/create-user.schema';
import { UserResponseSchemaDTO } from './schemas/user.schema';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { ProfileUserUseCase } from './useCases/profile-user.usecase';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly _createUserUseCase: CreateUserUseCase,
    private readonly _profileUserUseCase: ProfileUserUseCase
  ) {}

  @Post()
  async create(@Body() data: CreateUserSchemaDTO) {
    const user = await this._createUserUseCase.execute(data);
    return UserResponseSchemaDTO.parse(user);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req: Record<string, any>) {
    const userId = req['user']['sub'] as string;
    return await this._profileUserUseCase.execute(userId);
  }
}
