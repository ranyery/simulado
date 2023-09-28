import { IUser } from '@libs/shared/domain';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { IUsersRepository } from '../repositories/users.repository';
import { CreateUserRequestDTO } from '../schemas/create-user.schema';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly _usersRepository: IUsersRepository) {}

  async execute({ email, password }: CreateUserRequestDTO): Promise<IUser> {
    const user = await this._usersRepository.findByEmail(email);

    if (user) {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hash(password, 10);

    return await this._usersRepository.create({ email, password: hashedPassword });
  }
}
