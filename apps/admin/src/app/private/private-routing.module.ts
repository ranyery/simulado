import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EUserRole } from '@libs/shared/domain';

import { RolesGuard } from '../shared/guards/roles.guard';
import { DashboardPage } from './modules/dashboard/page/dashboard.page';
import { ShellPage } from './shell/shell.page';

export const enum EPrivateRoutes {
  DASHBOARD = 'dashboard',
  USERS = 'users',
  SUBJECTS = 'subjects',
  TOPICS = 'topics',
}

const allowedRoles = [EUserRole.ADMIN, EUserRole.MODERATOR];

const routes: Routes = [
  {
    path: '',
    component: ShellPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: EPrivateRoutes.DASHBOARD,
      },
      {
        path: EPrivateRoutes.DASHBOARD,
        component: DashboardPage,
      },
      {
        path: EPrivateRoutes.USERS,
        loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule),
        canMatch: [() => RolesGuard(allowedRoles)],
      },
      {
        path: EPrivateRoutes.SUBJECTS,
        loadChildren: () =>
          import('./modules/subjects/subjects.module').then((m) => m.SubjectsModule),
        canMatch: [() => RolesGuard(allowedRoles)],
      },
      {
        path: EPrivateRoutes.TOPICS,
        loadChildren: () => import('./modules/topics/topics.module').then((m) => m.TopicsModule),
        canMatch: [() => RolesGuard(allowedRoles)],
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
