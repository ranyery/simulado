import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDTO } from './dto/user.dto';
import { CreateUserUseCase } from './useCases/create-user.usecase';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return await this.createUserUseCase.execute(data);
  }
}
