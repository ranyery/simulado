import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SubjectsPage } from './page/subjects.page';

const routes: Routes = [{ path: '', component: SubjectsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectsRoutingModule {}
