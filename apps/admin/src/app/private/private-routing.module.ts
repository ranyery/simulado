import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EEntity, EUserRole } from '@libs/shared/domain';

import { RolesGuard } from '../shared/guards/roles.guard';
import { ShellPage } from './shell/shell.page';

export const allowedRoles = [EUserRole.MODERATOR, EUserRole.ADMIN];

const routes: Routes = [
  {
    path: '',
    component: ShellPage,
    children: [
      { path: '', pathMatch: 'full', redirectTo: EEntity.DASHBOARD },
      {
        path: EEntity.DASHBOARD,
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
        canMatch: [() => RolesGuard(allowedRoles)],
      },
      {
        path: EEntity.USERS,
        loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule),
        canMatch: [() => RolesGuard(allowedRoles)],
      },
      {
        path: EEntity.SUBJECTS,
        loadChildren: () =>
          import('./modules/subjects/subjects.module').then((m) => m.SubjectsModule),
        canMatch: [() => RolesGuard(allowedRoles)],
      },
      {
        path: EEntity.TOPICS,
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
