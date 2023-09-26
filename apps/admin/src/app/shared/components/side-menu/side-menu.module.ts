import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SideMenuComponent } from './side-menu.component';

@NgModule({
  declarations: [SideMenuComponent],
  imports: [CommonModule, RouterModule],
  exports: [SideMenuComponent],
})
export class SideMenuModule {}
