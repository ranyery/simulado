import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { CreateUserDTO } from '../dto/create-user.dto';
import { IUsersRepository } from '../repositories/users.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly _usersRepository: IUsersRepository) {}

  async execute({ email, password }: CreateUserDTO) {
    const user = await this._usersRepository.findByEmail(email);

    if (user) {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hash(password, 10);

    return await this._usersRepository.save({ email, password: hashedPassword });
  }
}
