import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { ELocalStorage } from '../../../../shared/constants/local-storage.enum';
import { ILoginRequest } from '../../../../shared/interfaces/login.interface';
import { AuthService } from '../../../../shared/services/auth.service';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _toastService = inject(ToastService);
  private readonly _localStorageService = inject(LocalStorageService);

  public isLoading: boolean = false;
  public isLoginButtonDisabled = false;
  public form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  private _currentLoginAttempts = 0;
  private readonly MAX_LOGIN_ATTEMPTS = 3;

  constructor() {}

  ngOnInit(): void {
    this._getLoginAttempts();
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    if (this._currentLoginAttempts === this.MAX_LOGIN_ATTEMPTS) {
      this.isLoginButtonDisabled = true;
      this._toastService.close();
      this._showIPBlockedAlert();
      return;
    }

    this.isLoading = true;
    this._currentLoginAttempts += 1;
    const { email, password } = this.form.value as ILoginRequest;
    this._authService
      .login(email, password)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this._toastService.open({
            type: 'success',
            message: 'Login realizado com sucesso.',
          });
          this._localStorageService.removeItem(ELocalStorage.LOGIN_ATTEMPTS);
          this._router.navigate(['/', 'cockpit']);
        },
        error: () => {
          this._toastService.close();
          this._toastService.open({
            type: 'error',
            message: 'Credenciais inválidas. Por favor, verifique seu email e senha.',
            life: 5000,
          });
          this._localStorageService.setItem(
            ELocalStorage.LOGIN_ATTEMPTS,
            this._currentLoginAttempts
          );
        },
      });
  }

  private _getLoginAttempts(): void {
    const value = this._localStorageService.getItem(ELocalStorage.LOGIN_ATTEMPTS) || '';
    const parsedValue = parseInt(value);
    this._currentLoginAttempts = !isNaN(parsedValue) ? parsedValue : 0;
  }

  private _showIPBlockedAlert(): void {
    this._toastService.open({
      type: 'warn',
      message:
        'Seu IP foi bloqueado temporariamente devido a várias tentativas de login malsucedidas.',
      life: 60000,
      closable: false,
    });
  }
}
