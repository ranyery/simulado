import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionsPage } from './page/questions.page';

const routes: Routes = [{ path: '', component: QuestionsPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsRoutingModule {}
