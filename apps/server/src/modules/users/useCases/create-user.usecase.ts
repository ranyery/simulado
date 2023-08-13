import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { PrismaService } from '../../../infra/database/prisma.service';
import { CreateUserDTO } from '../dto/user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(data: CreateUserDTO) {
    const user = await this.prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hash(data.password, 10);

    return await this.prisma.users.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }
}
