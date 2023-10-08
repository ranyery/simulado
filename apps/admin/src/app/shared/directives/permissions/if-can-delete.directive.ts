import { NgIf } from '@angular/common';
import { Directive, inject } from '@angular/core';

import { UserRolesService } from '../../services/user-roles.service';

@Directive({
  selector: '[ifCanDelete]',
  hostDirectives: [NgIf],
})
export class IfCanDeleteDirective {
  private readonly _ngIfDirective = inject(NgIf);
  private readonly _userRolesService = inject(UserRolesService);

  constructor() {
    this._ngIfDirective.ngIf = this._userRolesService.isAdmin();
  }
}
