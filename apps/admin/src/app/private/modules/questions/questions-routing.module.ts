import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionCrudPage } from './pages/question-crud/question-crud.page';
import { QuestionListPage } from './pages/question-list/question-list.page';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: QuestionListPage },
  { path: 'crud', component: QuestionCrudPage },
  { path: 'crud/:id', component: QuestionCrudPage },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsRoutingModule {}
