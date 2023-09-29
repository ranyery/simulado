import { inject, Injectable } from '@angular/core';
import { EEntity, IEntityPermission } from '@libs/shared/domain';

import { JwtService } from './jwt.service';

type actionTypes = 'read' | 'create' | 'update' | 'delete';

@Injectable({ providedIn: 'root' })
export class PermissionsService {
  private readonly _jwtService = inject(JwtService);

  private _userPermissions: IEntityPermission[] = [];

  public setUserPermissions(permissions: IEntityPermission[]): void {
    this._userPermissions = permissions || [];
  }

  public getUserPermissions(): IEntityPermission[] {
    return this._userPermissions;
  }

  public updateUserPermissions(): void {
    const decodedToken = this._jwtService.decodeToken();
    if (decodedToken) {
      const { permissions } = decodedToken;
      this.setUserPermissions(permissions);
    }
  }

  public canRead(entity: EEntity): boolean {
    return this._hasPermission(entity, 'read');
  }

  public canCreate(entity: EEntity): boolean {
    return this._hasPermission(entity, 'create');
  }

  public canUpdate(entity: EEntity): boolean {
    return this._hasPermission(entity, 'update');
  }

  public canDelete(entity: EEntity): boolean {
    return this._hasPermission(entity, 'delete');
  }

  private _hasPermission(entity: EEntity, action: actionTypes): boolean {
    if (this._userPermissions.length === 0) false;

    const entityPermission = this._userPermissions.find(
      (permission: IEntityPermission) => permission.entity === entity
    );

    if (entityPermission) {
      return entityPermission[action] === true;
    }

    return false;
  }
}
