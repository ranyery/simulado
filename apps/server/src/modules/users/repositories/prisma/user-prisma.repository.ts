import { IUser } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../infra/database/prisma.service';
import { CreateUserDTO } from '../../dto/user.dto';
import { IUsersRepository } from '../users.repository';

@Injectable()
export class UserPrismaRepository implements IUsersRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<IUser> {
    return await this._prismaService.users.findUnique({
      where: {
        email: email,
      },
    });
  }

  async save(data: CreateUserDTO): Promise<IUser> {
    return await this._prismaService.users.create({ data });
  }
}
