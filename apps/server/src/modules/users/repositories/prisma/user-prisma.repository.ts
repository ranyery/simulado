import { IUser } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../infra/database/prisma.service';
import { CreateUserRequestDTO } from '../../schemas/create-user.schema';
import { IUsersRepository } from '../users.repository';

@Injectable()
export class UserPrismaRepository implements IUsersRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(data: CreateUserRequestDTO): Promise<IUser> {
    const user = await this._prismaService.user.create({ data });
    return {
      ...user,
      permissions: JSON.parse(user.permissions),
    } satisfies IUser;
  }

  async findAll(): Promise<IUser[]> {
    const users = await this._prismaService.user.findMany({ orderBy: { createdAt: 'desc' } });
    return users.map((user) => ({
      ...user,
      permissions: JSON.parse(user.permissions),
    })) satisfies IUser[];
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await this._prismaService.user.findUnique({ where: { id } });

    if (!user) return null;

    return {
      ...user,
      permissions: JSON.parse(user.permissions),
    } satisfies IUser;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this._prismaService.user.findUnique({ where: { email } });

    if (!user) return null;

    return {
      ...user,
      permissions: JSON.parse(user.permissions),
    } satisfies IUser;
  }
}
