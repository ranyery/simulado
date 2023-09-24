import { IUser } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';

import { IUsersRepository } from '../repositories/users.repository';

@Injectable()
export class ValidateTokenUseCase {
  constructor(private readonly _usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<IUser | null> {
    return this._usersRepository.findById(id);
  }
}
