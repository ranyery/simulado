import { IUser } from '@libs/shared/domain';

export type SignInDTO = Pick<IUser, 'email' | 'password'>;
