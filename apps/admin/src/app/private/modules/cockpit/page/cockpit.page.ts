import { Component, inject } from '@angular/core';

import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.page.html',
  styleUrls: ['./cockpit.page.scss'],
})
export class CockpitPage {
  private readonly _authService = inject(AuthService);

  public readonly items = [
    { icon: 'pi-home', label: 'Home', route: '' },
    { icon: 'pi-star', label: 'Dashboard', route: 'dashboard' },
    { icon: 'pi-user', label: 'Quizzes', route: 'quizzes' },
    { icon: 'pi-sliders-h', label: 'Exams', route: 'exams' },
  ];

  public logout(): void {
    this._authService.logout();
  }
}
