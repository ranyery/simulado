import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { IUsersRepository } from '../../users/repositories/users.repository';

@Injectable()
export class ValidateTokenUseCase {
  constructor(private readonly _usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this._usersRepository.findById(id);

    if (!user) {
      throw new HttpException('Invalid token. Access denied!', HttpStatus.BAD_REQUEST);
    }
  }
}
