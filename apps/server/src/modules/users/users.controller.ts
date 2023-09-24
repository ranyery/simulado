import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import { CreateUserDTO } from './dto/user.dto';
import { CreateUserValidationPipe } from './pipes/create-user-validation.pipe';
import { CreateUserUseCase } from './useCases/create-user.usecase';

@Controller('users')
export class UsersController {
  constructor(private readonly _createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUserDTO) {
    return await this._createUserUseCase.execute(data);
  }
}
