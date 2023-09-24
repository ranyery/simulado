import { IUser } from '@libs/shared/domain';

import { CreateUserDTO } from '../dto/user.dto';

export abstract class IUsersRepository {
  abstract findByEmail(email: string): Promise<IUser | undefined>;
  abstract save(data: CreateUserDTO): Promise<IUser>;
  abstract findById(id: string): Promise<IUser | undefined>;
}
