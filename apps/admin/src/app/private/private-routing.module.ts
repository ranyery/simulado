import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShellPage } from './shell/shell.page';

const routes: Routes = [
  {
    path: '',
    component: ShellPage,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/cockpit/cockpit.module').then((m) => m.CockpitModule),
      },
      {
        path: 'subjects',
        loadChildren: () =>
          import('./modules/subjects/subjects.module').then((m) => m.SubjectsModule),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
