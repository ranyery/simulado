import { IUser } from '@libs/shared/domain';

import { CreateUserDTO } from '../dto/create-user.dto';

export abstract class IUsersRepository {
  abstract save(data: CreateUserDTO): Promise<IUser>;
  abstract findById(id: string): Promise<IUser | null>;
  abstract findByEmail(email: string): Promise<IUser | null>;
}
