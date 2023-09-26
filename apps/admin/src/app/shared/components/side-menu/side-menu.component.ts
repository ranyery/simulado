import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

interface IMenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent implements OnInit {
  private readonly _authService = inject(AuthService);

  public readonly menuItems: ReadonlyArray<IMenuItem> = [
    { icon: 'pi-home', label: 'Dashboard', route: 'dashboard' },
    { icon: 'pi-book', label: 'Matérias', route: 'subjects' },
  ];

  ngOnInit(): void {}

  public logout(): void {
    this._authService.logout();
  }
}
