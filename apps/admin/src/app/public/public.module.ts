import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginModule } from './modules/login/login.module';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PublicRoutingModule, LoginModule],
})
export class PublicModule {}
