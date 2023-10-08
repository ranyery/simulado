import { EUserRole } from '@libs/shared/domain';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { ROLES_KEY } from './roles.decorator';

export function Auth(...roles: EUserRole[]) {
  return applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(AuthGuard, RolesGuard));
}
