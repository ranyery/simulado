import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';

import { UsersPage } from './page/users.page';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UsersPage],
  imports: [CommonModule, UsersRoutingModule, ReactiveFormsModule, InputSwitchModule, ButtonModule],
})
export class UsersModule {}
