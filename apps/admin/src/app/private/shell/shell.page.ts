import { Component, inject, OnInit } from '@angular/core';
import { EEntity } from '@libs/shared/domain';

import { AuthService } from '../../shared/services/auth.service';
import { UserRolesService } from '../../shared/services/user-roles.service';
import { allowedRoles } from '../private-routing.module';

interface IMenuItem {
  icon: string;
  label: string;
  route: string | EEntity;
  isEnabled: boolean;
}

@Component({
  selector: 'app-shell',
  templateUrl: './shell.page.html',
  styleUrls: ['./shell.page.scss'],
})
export class ShellPage implements OnInit {
  private readonly _authService = inject(AuthService);
  private readonly _userRolesService = inject(UserRolesService);

  public readonly menuItems: ReadonlyArray<IMenuItem> = [
    {
      label: 'Dashboard',
      icon: 'pi-chart-bar',
      route: 'dashboard',
      isEnabled: this._userRolesService.hasAtLeastOneRole(allowedRoles),
    },
    {
      label: 'Usuários',
      icon: 'pi-users',
      route: EEntity.USERS,
      isEnabled: this._userRolesService.hasAtLeastOneRole(allowedRoles),
    },
    {
      label: 'Matérias',
      icon: 'pi-book',
      route: EEntity.SUBJECTS,
      isEnabled: this._userRolesService.hasAtLeastOneRole(allowedRoles),
    },
    {
      label: 'Tópicos',
      icon: 'pi-tags',
      route: EEntity.TOPICS,
      isEnabled: this._userRolesService.hasAtLeastOneRole(allowedRoles),
    },
  ];

  ngOnInit(): void {}

  public logout(): void {
    this._authService.logout();
  }
}
