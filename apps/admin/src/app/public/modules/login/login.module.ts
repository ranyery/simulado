import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LoginPage } from './page/login.page';

@NgModule({
  declarations: [LoginPage],
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
})
export class LoginModule {}
