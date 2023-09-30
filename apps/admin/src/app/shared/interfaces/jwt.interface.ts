import { EUserRole, IEntityPermission } from '@libs/shared/domain';

export interface IJwt {
  sub: string;
  email: string;
  permissions: IEntityPermission[];
  roles: EUserRole[];
  iat: number;
  exp: number;
}
