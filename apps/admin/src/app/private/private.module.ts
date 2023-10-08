import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { PrivateRoutingModule } from './private-routing.module';
import { ShellPage } from './shell/shell.page';

@NgModule({
  declarations: [ShellPage],
  imports: [CommonModule, PrivateRoutingModule, ButtonModule],
  providers: [DialogService, DynamicDialogRef],
})
export class PrivateModule {}
