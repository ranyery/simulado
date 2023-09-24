import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const redirectToLoginPage = () => router.navigate(['/', 'login']);

  return authService.validateToken().pipe(
    map((isValid) => {
      return isValid || redirectToLoginPage();
    })
  );
};
