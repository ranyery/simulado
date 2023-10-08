import { IUser } from '@libs/shared/domain';

import { CreateUserRequestDTO } from '../schemas/create-user.schema';

export abstract class IUsersRepository {
  abstract create(data: CreateUserRequestDTO): Promise<IUser>;
  abstract findAll(): Promise<IUser[]>;
  abstract findById(id: string): Promise<IUser | null>;
  abstract findByEmail(email: string): Promise<IUser | null>;
}
