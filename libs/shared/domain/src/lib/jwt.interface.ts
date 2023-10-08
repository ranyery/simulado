import { EUserRole, IEntityPermission } from './user.interface';

export interface IJwt {
  sub: string;
  email: string;
  roles: EUserRole[];
  permissions: IEntityPermission[];
  iat: number;
  exp: number;
}
