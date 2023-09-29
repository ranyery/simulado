import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { EEntity } from '@libs/shared/domain';

import { EPrivateRoutes } from '../../../private/private-routing.module';
import { AuthService } from '../../../shared/services/auth.service';
import { PermissionsService } from '../../../shared/services/permissions.service';

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
  private readonly _permissionsService = inject(PermissionsService);

  public readonly menuItems: ReadonlyArray<IMenuItem> = [
    {
      icon: 'pi-chart-bar',
      label: 'Dashboard',
      route: EPrivateRoutes.DASHBOARD,
      isEnabled: true,
    },
    {
      icon: 'pi-users',
      label: 'Usuários',
      route: EPrivateRoutes.USERS,
      isEnabled: this._permissionsService.canRead(EEntity.USERS),
    },
    {
      icon: 'pi-book',
      label: 'Matérias',
      route: EPrivateRoutes.SUBJECTS,
      isEnabled: this._permissionsService.canRead(EEntity.SUBJECTS),
    },
    {
      icon: 'pi-tags',
      label: 'Tópicos',
      route: EPrivateRoutes.TOPICS,
      isEnabled: this._permissionsService.canRead(EEntity.TOPICS),
    },
  ];

  ngOnInit(): void {}

  public logout(): void {
    this._authService.logout();
  }
}
