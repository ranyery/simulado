import { EUserRole, IJwt } from '@libs/shared/domain';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this._reflector.getAllAndOverride<EUserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    // Verifique se há uma interseção entre as roles do usuário e as roles requeridas
    return requiredRoles.some((role) => (request['user'] as IJwt).roles.includes(role));
  }
}
