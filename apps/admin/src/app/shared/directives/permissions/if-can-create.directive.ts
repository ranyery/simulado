import { NgIf } from '@angular/common';
import { Directive, inject } from '@angular/core';

import { allowedRoles } from '../../../private/private-routing.module';
import { UserRolesService } from '../../services/user-roles.service';

@Directive({
  selector: '[ifCanCreate]',
  hostDirectives: [NgIf],
})
export class IfCanCreateDirective {
  private readonly _ngIfDirective = inject(NgIf);
  private readonly _userRolesService = inject(UserRolesService);

  constructor() {
    this._ngIfDirective.ngIf = this._userRolesService.hasAtLeastOneRole(allowedRoles);
  }
}
