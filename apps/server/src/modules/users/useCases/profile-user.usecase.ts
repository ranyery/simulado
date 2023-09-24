import { Injectable } from '@nestjs/common';

import { IUsersRepository } from '../repositories/users.repository';

@Injectable()
export class ProfileUserUseCase {
  constructor(private readonly _usersRepository: IUsersRepository) {}

  async execute(id: string) {
    return this._usersRepository.findById(id);
  }
}
