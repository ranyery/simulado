import { Body, Controller, Get, Post, Request, UseGuards, UsePipes } from '@nestjs/common';

import { AuthGuard } from '../../shared/guards/auth.guard';
import { CreateUserDTO } from './dto/user.dto';
import { CreateUserValidationPipe } from './pipes/create-user-validation.pipe';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { ProfileUserUseCase } from './useCases/profile-user.usecase';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly _createUserUseCase: CreateUserUseCase,
    private readonly _profileUserUseCase: ProfileUserUseCase
  ) {}

  @Post()
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUserDTO) {
    return await this._createUserUseCase.execute(data);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req) {
    const userId = req['user']['sub'] as string;
    return await this._profileUserUseCase.execute(userId);
  }
}
