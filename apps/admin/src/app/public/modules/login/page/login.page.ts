import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  public onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    console.log('forms:', { email, password });
  }
}
