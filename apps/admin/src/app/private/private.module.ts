import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PrivateRoutingModule } from './private-routing.module';
import { ShellPage } from './shell/shell.page';

@NgModule({
  declarations: [ShellPage, SideMenuComponent],
  imports: [CommonModule, PrivateRoutingModule, DashboardModule, ButtonModule],
  providers: [DialogService, DynamicDialogRef],
})
export class PrivateModule {}
