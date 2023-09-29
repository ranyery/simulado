import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserRequestDTO } from './schemas/create-user.schema';
import { UserResponseDTO } from './schemas/user.schema';
import { CreateUserUseCase } from './useCases/create-user.usecase';

@Controller('/users')
export class UsersController {
  constructor(private readonly _createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() data: CreateUserRequestDTO) {
    const user = await this._createUserUseCase.execute(data);
    const userDTO = UserResponseDTO.parse(user);
    return userDTO;
  }
}
