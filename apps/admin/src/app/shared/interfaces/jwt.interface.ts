import { EUserRole, IEntityPermission } from '@libs/shared/domain';

export interface IJwt {
  sub: string;
  email: string;
  roles: EUserRole[];
  permissions: IEntityPermission[];
  iat: number;
  exp: number;
}
