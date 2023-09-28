import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SideMenuModule } from '../shared/components/side-menu/side-menu.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PrivateRoutingModule } from './private-routing.module';
import { ShellPage } from './shell/shell.page';

@NgModule({
  declarations: [ShellPage],
  imports: [CommonModule, PrivateRoutingModule, SideMenuModule, DashboardModule],
})
export class PrivateModule {}
