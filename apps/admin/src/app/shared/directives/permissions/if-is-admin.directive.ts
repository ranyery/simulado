import { NgIf } from '@angular/common';
import { Directive, inject } from '@angular/core';
import { EUserRole } from '@libs/shared/domain';

import { UserRolesService } from '../../services/user-roles.service';

@Directive({
  selector: '[ifIsAdmin]',
  hostDirectives: [NgIf],
})
export class IfIsAdminDirective {
  private readonly _ngIfDirective = inject(NgIf);
  private readonly _userRolesService = inject(UserRolesService);

  constructor() {
    this._ngIfDirective.ngIf = this._userRolesService.hasRole(EUserRole.ADMIN);
  }
}
