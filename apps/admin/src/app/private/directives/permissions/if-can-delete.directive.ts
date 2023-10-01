import { NgIf } from '@angular/common';
import { Directive, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserPermissionsService } from '../../../shared/services/user-permissions.service';
import { IRouteData } from '../../interfaces/route-data.interface';

@Directive({
  selector: '[ifCanDelete]',
  hostDirectives: [NgIf],
})
export class IfCanDeleteDirective {
  private readonly _ngIfDirective = inject(NgIf);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _userPermissionsService = inject(UserPermissionsService);

  constructor() {
    const { entity } = this._activatedRoute.snapshot.data as IRouteData;
    this._ngIfDirective.ngIf = this._userPermissionsService.canDelete(entity);
  }
}
