import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CockpitRoutingModule } from './cockpit-routing.module';
import { CockpitPage } from './page/cockpit.page';

@NgModule({
  declarations: [CockpitPage],
  imports: [CommonModule, CockpitRoutingModule],
})
export class CockpitModule {}
