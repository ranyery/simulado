import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstitutesPage } from './page/institutes.page';

const routes: Routes = [{ path: '', component: InstitutesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutesRoutingModule {}
