import { Injectable } from '@nestjs/common';
import { PrismaService } from 'apps/server/src/infra/database/prisma.service';

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
      throw new Error('User already exists!');
    }

    return await this.prisma.users.create({
      data,
    });
  }
}
