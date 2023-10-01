import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PrivateRoutingModule } from './private-routing.module';
import { ShellPage } from './shell/shell.page';

@NgModule({
  declarations: [ShellPage],
  imports: [CommonModule, PrivateRoutingModule, DashboardModule, ButtonModule],
  providers: [DialogService, DynamicDialogRef],
})
export class PrivateModule {}
