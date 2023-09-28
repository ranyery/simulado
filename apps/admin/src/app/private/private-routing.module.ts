import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardPage } from './modules/dashboard/page/dashboard.page';
import { ShellPage } from './shell/shell.page';

export const enum EPrivateRoutes {
  DASHBOARD = 'dashboard',
  USERS = 'users',
  SUBJECTS = 'subjects',
}

const routes: Routes = [
  {
    path: '',
    component: ShellPage,
    children: [
      { path: '', pathMatch: 'full', redirectTo: EPrivateRoutes.DASHBOARD },
      {
        path: EPrivateRoutes.DASHBOARD,
        component: DashboardPage,
      },
      {
        path: EPrivateRoutes.USERS,
        loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: EPrivateRoutes.SUBJECTS,
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
