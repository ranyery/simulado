import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { IUsersRepository } from '../../users/repositories/users.repository';
import { TokenService } from '../services/token.service';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly _tokenService: TokenService,
    private readonly _usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<string> {
    const user = await this._usersRepository.findById(id);

    if (!user) {
      throw new HttpException('Invalid token. Access denied!', HttpStatus.BAD_REQUEST);
    }

    return this._tokenService.create(user);
  }
}
