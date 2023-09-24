import { IUser } from '@libs/shared/domain';

export type CreateUserDTO = Pick<IUser, 'email' | 'password'>;
