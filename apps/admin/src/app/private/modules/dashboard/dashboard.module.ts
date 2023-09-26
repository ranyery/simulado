import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './page/dashboard.page';

@NgModule({
  declarations: [DashboardPage],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
