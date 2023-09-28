import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UsersPage } from './page/users.page';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UsersPage],
  imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}
