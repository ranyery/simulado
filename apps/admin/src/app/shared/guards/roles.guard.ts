import { inject } from '@angular/core';
import { EUserRole } from '@simulado/domain';

import { UserRolesService } from '../services/user-roles.service';

// Verifica se o usuário possui pelo menos uma das roles permitidas
export const RolesGuard = (allowedRoles: EUserRole[]): boolean => {
  const rolesService = inject(UserRolesService);

  return rolesService.hasAtLeastOneRole(allowedRoles);
};
