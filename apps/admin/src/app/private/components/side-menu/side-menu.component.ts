import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { EUserRole } from '@libs/shared/domain';

import { EPrivateRoutes } from '../../../private/private-routing.module';
import { AuthService } from '../../../shared/services/auth.service';
import { UserRolesService } from '../../../shared/services/user-roles.service';

interface IMenuItem {
  icon: string;
  label: string;
  route: EPrivateRoutes;
  isEnabled: boolean;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent implements OnInit {
  private readonly _authService = inject(AuthService);
  private readonly _userRolesService = inject(UserRolesService);

  public readonly menuItems: ReadonlyArray<IMenuItem> = [
    {
      label: 'Dashboard',
      icon: 'pi-chart-bar',
      route: EPrivateRoutes.DASHBOARD,
      isEnabled: true,
    },
    {
      label: 'Usuários',
      icon: 'pi-users',
      route: EPrivateRoutes.USERS,
      isEnabled: this._userHasAllowedRole(),
    },
    {
      label: 'Matérias',
      icon: 'pi-book',
      route: EPrivateRoutes.SUBJECTS,
      isEnabled: this._userHasAllowedRole(),
    },
    {
      label: 'Tópicos',
      icon: 'pi-tags',
      route: EPrivateRoutes.TOPICS,
      isEnabled: this._userHasAllowedRole(),
    },
  ];

  ngOnInit(): void {}

  public logout(): void {
    this._authService.logout();
  }

  private _userHasAllowedRole(): boolean {
    const allowedRoles = [EUserRole.ADMIN, EUserRole.MODERATOR];
    return this._userRolesService.hasAtLeastOneRole(allowedRoles);
  }
}
