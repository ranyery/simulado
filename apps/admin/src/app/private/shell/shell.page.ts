import { Component, inject, OnInit } from '@angular/core';
import { EEntity } from '@libs/shared/domain';

import { AuthService } from '../../shared/services/auth.service';
import { UserPermissionsService } from '../../shared/services/user-permissions.service';

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
  private readonly _userPermissionsService = inject(UserPermissionsService);

  public readonly menuItems: ReadonlyArray<IMenuItem> = [
    {
      label: 'Dashboard',
      icon: 'pi-chart-bar',
      route: 'dashboard',
      isEnabled: true,
    },
    {
      label: 'Usuários',
      icon: 'pi-users',
      route: EEntity.USERS,
      isEnabled: this._userPermissionsService.canRead(EEntity.USERS),
    },
    {
      label: 'Matérias',
      icon: 'pi-book',
      route: EEntity.SUBJECTS,
      isEnabled: this._userPermissionsService.canRead(EEntity.SUBJECTS),
    },
    {
      label: 'Tópicos',
      icon: 'pi-tags',
      route: EEntity.TOPICS,
      isEnabled: this._userPermissionsService.canRead(EEntity.TOPICS),
    },
  ];

  ngOnInit(): void {}

  public logout(): void {
    this._authService.logout();
  }
}
