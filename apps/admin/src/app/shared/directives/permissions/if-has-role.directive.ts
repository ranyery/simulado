import { NgIf } from '@angular/common';
import { Directive, inject, Input } from '@angular/core';
import { EUserRole } from '@libs/shared/domain';

import { UserRolesService } from '../../services/user-roles.service';

@Directive({
  selector: '[ifHasRole]',
  hostDirectives: [NgIf],
})
export class IfHasRoleDirective {
  private readonly _ngIfDirective = inject(NgIf);
  private readonly _userRolesService = inject(UserRolesService);

  @Input('ifHasRole') set role(role: EUserRole) {
    this._ngIfDirective.ngIf = this._userRolesService.hasRole(role);
  }
}
