import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IEntityPermission } from '@libs/shared/domain';
import { UserRolesService } from '../../../../shared/services/user-roles.service';

interface IPermissionForm {
  entity: FormControl<string | null>;
  read: FormControl<boolean | null>;
  create: FormControl<boolean | null>;
  update: FormControl<boolean | null>;
  delete: FormControl<boolean | null>;
}

const permissions: IEntityPermission[] = [
  { entity: 'users', read: true, create: true, update: true, delete: false },
  { entity: 'subjects', read: true, create: true, update: true, delete: false },
  { entity: 'topics', read: true, create: false, update: false, delete: false },
];

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  private readonly _userRolesService = inject(UserRolesService);

  public entityPermissionForms: FormGroup<IPermissionForm>[] = [];

  constructor() {}

  ngOnInit(): void {
    const isAdmin = this._userRolesService.isAdmin();
    permissions.forEach((permission) => {
      this.entityPermissionForms.push(
        new FormGroup({
          entity: new FormControl<string>(
            { value: permission.entity, disabled: false },
            Validators.required
          ),
          read: new FormControl<boolean>({ value: permission.read, disabled: !isAdmin }),
          create: new FormControl<boolean>({ value: permission.create, disabled: !isAdmin }),
          update: new FormControl<boolean>({ value: permission.update, disabled: !isAdmin }),
          delete: new FormControl<boolean>({ value: permission.delete, disabled: !isAdmin }),
        })
      );
    });
  }

  public addPermission(): void {
    this.entityPermissionForms.push(
      new FormGroup({
        entity: new FormControl<string>({ value: '', disabled: false }, Validators.required),
        read: new FormControl<boolean>({ value: false, disabled: false }),
        create: new FormControl<boolean>({ value: false, disabled: false }),
        update: new FormControl<boolean>({ value: false, disabled: false }),
        delete: new FormControl<boolean>({ value: false, disabled: true }),
      })
    );
  }

  public deletePermission(index: number): void {
    this.entityPermissionForms.splice(index, 1);
  }

  public updatePermission(form: FormGroup<IPermissionForm>): void {
    console.log(form.value);
  }

  public salvar(): void {
    const permissions = this.entityPermissionForms.map((form) => form.value);
    console.log('permissions:', permissions);
  }
}
