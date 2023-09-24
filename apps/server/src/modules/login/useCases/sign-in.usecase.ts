import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { IUsersRepository } from '../../users/repositories/users.repository';
import { SignInDTO } from '../dto/sign-in.dto';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: SignInDTO) {
    const user = await this._usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordEqual = await compare(password, user.password);

    if (!isPasswordEqual) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = await this._jwtService.signAsync(payload);

    return { token };
  }
}
