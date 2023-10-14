import { EUserRole } from './user.interface';

export interface IJwt {
  sub: string;
  email: string;
  roles: EUserRole[];
  iat: number;
  exp: number;
}
