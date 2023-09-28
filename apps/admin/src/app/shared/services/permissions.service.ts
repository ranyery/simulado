import { Injectable } from '@angular/core';
import { EEntity, IEntityPermission } from '@libs/shared/domain';

type actionTypes = 'read' | 'create' | 'update' | 'delete';

@Injectable({ providedIn: 'root' })
export class PermissionsService {
  private _userPermissions: IEntityPermission[] = [];

  public setUserPermissions(permissions: IEntityPermission[]): void {
    this._userPermissions = permissions || [];
  }

  public getUserPermissions(): IEntityPermission[] {
    return this._userPermissions;
  }

  public canRead(entity: EEntity): boolean {
    return this.hasPermission(entity, 'read');
  }

  public canCreate(entity: EEntity): boolean {
    return this.hasPermission(entity, 'create');
  }

  public canUpdate(entity: EEntity): boolean {
    return this.hasPermission(entity, 'update');
  }

  public canDelete(entity: EEntity): boolean {
    return this.hasPermission(entity, 'delete');
  }

  public hasPermission(entity: EEntity, action: actionTypes): boolean {
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
