import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';

import { IUsersRepository } from '../../users/repositories/users.repository';
import { LoginRequestDTO } from '../schemas/login.schema';
import { TokenService } from '../services/token.service';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly _tokenService: TokenService,
    private readonly _usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: LoginRequestDTO): Promise<string> {
    const user = await this._usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordEqual = await compare(password, user.password);

    if (!isPasswordEqual) {
      throw new UnauthorizedException();
    }

    return this._tokenService.create(user);
  }
}
