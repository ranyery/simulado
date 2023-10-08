import { NgIf } from '@angular/common';
import { Directive, inject } from '@angular/core';

import { allowedRoles } from '../../../private/private-routing.module';
import { AuthService } from '../../services/auth.service';
import { UserRolesService } from '../../services/user-roles.service';

@Directive({
  selector: '[ifCanRead]',
  hostDirectives: [NgIf],
})
export class IfCanReadDirective {
  private readonly _ngIfDirective = inject(NgIf);
  private readonly _authService = inject(AuthService);
  private readonly _userRolesService = inject(UserRolesService);

  constructor() {
    const canRead = this._userRolesService.hasAtLeastOneRole(allowedRoles);

    if (!canRead) {
      this._authService.logout();
      this._ngIfDirective.ngIf = false;
      return;
    }

    this._ngIfDirective.ngIf = true;
  }
}
