import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ILoginRequest } from '../../../../shared/interfaces/login.interface';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  public form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}

  public onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value as ILoginRequest;
    this._authService.login(email, password).subscribe({
      next: () => {
        this._router.navigate(['/', 'cockpit']);
      },
      error: () => {
        // Handle error
      },
    });
  }
}
