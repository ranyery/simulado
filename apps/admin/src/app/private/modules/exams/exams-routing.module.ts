import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamsPage } from './page/exams.page';

const routes: Routes = [{ path: '', component: ExamsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamsRoutingModule {}
