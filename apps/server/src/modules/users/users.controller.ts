import { EUserRole } from '@libs/shared/domain';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { Auth } from '../../shared/decorators/auth.decorator';
import { CreateUserRequestDTO, CreateUserResponseDTO } from './schemas/create-user.schema';
import { UserResponseDTO } from './schemas/user.schema';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { FindAllUsersUseCase } from './useCases/find-all-users.usecase';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly _createUserUseCase: CreateUserUseCase,
    private readonly _findAllUsersUseCase: FindAllUsersUseCase
  ) {}

  @Get()
  @Auth(EUserRole.ADMIN)
  async getAll() {
    const users = await this._findAllUsersUseCase.execute();
    const usersDTO = users.map((user) => UserResponseDTO.parse(user));
    return usersDTO;
  }

  @Post()
  async create(@Body() data: CreateUserRequestDTO) {
    const user = await this._createUserUseCase.execute(data);
    const userDTO = CreateUserResponseDTO.parse(user);
    return userDTO;
  }
}
