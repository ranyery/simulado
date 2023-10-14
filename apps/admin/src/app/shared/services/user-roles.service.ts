import { inject, Injectable } from '@angular/core';
import { EUserRole } from '@simulado/domain';

import { JwtService } from './jwt.service';

@Injectable({ providedIn: 'root' })
export class UserRolesService {
  private readonly _jwtService = inject(JwtService);

  private _userRoles: EUserRole[] = [];

  constructor() {}

  public isAdmin(): boolean {
    return this.hasRole(EUserRole.ADMIN);
  }

  public getRoles(): EUserRole[] {
    return [...this._userRoles];
  }

  public hasRole(role: EUserRole): boolean {
    return this._userRoles.includes(role);
  }

  public hasAtLeastOneRole(roles: EUserRole[]): boolean {
    // Verifique se há uma interseção entre as roles do usuário e as roles permitidas
    const hasIntersection = this._userRoles.some((userRole) => roles.includes(userRole));
    return hasIntersection;
  }

  public updateRoles(): void {
    const decodedToken = this._jwtService.decodeToken();
    if (decodedToken) {
      const { roles } = decodedToken;
      this._userRoles = roles;
    }
  }
}
