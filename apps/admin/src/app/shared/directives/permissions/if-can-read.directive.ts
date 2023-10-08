import { NgIf } from '@angular/common';
import { Directive, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRouteData } from '../../interfaces/route-data.interface';
import { AuthService } from '../../services/auth.service';
import { UserPermissionsService } from '../../services/user-permissions.service';

@Directive({
  selector: '[ifCanRead]',
  hostDirectives: [NgIf],
})
export class IfCanReadDirective {
  private readonly _ngIfDirective = inject(NgIf);
  private readonly _authService = inject(AuthService);
  private readonly _userPermissionsService = inject(UserPermissionsService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  constructor() {
    const { entity } = this._activatedRoute.snapshot.data as IRouteData;
    const canRead = this._userPermissionsService.canRead(entity);

    if (!canRead) {
      this._authService.logout();
      this._ngIfDirective.ngIf = false;
      return;
    }

    this._ngIfDirective.ngIf = true;
  }
}