import { IUser } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';

import { IUsersRepository } from '../repositories/users.repository';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly _usersRepository: IUsersRepository) {}

  async execute(): Promise<IUser[]> {
    return await this._usersRepository.findAll();
  }
}
