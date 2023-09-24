import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CockpitPage } from './page/cockpit.page';

const routes: Routes = [{ path: '', component: CockpitPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CockpitRoutingModule {}
