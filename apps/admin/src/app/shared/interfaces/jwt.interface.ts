import { IEntityPermission } from '@libs/shared/domain';

export interface IJwt {
  sub: string;
  email: string;
  permissions: IEntityPermission[];
  iat: number;
  exp: number;
}
