import { IUser } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../infra/database/prisma.service';
import { CreateUserRequestDTO } from '../../schemas/create-user.schema';
import { IUsersRepository } from '../users.repository';

@Injectable()
export class UserPrismaRepository implements IUsersRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async save(data: CreateUserRequestDTO): Promise<IUser> {
    return this._prismaService.user.create({ data });
  }

  async findById(id: string): Promise<IUser | null> {
    return this._prismaService.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this._prismaService.user.findUnique({
      where: { email },
    });
  }
}
