import { NgIf } from '@angular/common';
import { Directive, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRouteData } from '../../interfaces/route-data.interface';
import { UserPermissionsService } from '../../services/user-permissions.service';

@Directive({
  selector: '[ifCanUpdate]',
  hostDirectives: [NgIf],
})
export class IfCanUpdateDirective {
  private readonly _ngIfDirective = inject(NgIf);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _userPermissionsService = inject(UserPermissionsService);

  constructor() {
    const { entity } = this._activatedRoute.snapshot.data as IRouteData;
    this._ngIfDirective.ngIf = this._userPermissionsService.canUpdate(entity);
  }
}