import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EEntity, EUserRole } from '@libs/shared/domain';

import { RolesGuard } from '../shared/guards/roles.guard';
import { DashboardPage } from './modules/dashboard/page/dashboard.page';
import { ShellPage } from './shell/shell.page';

const allowedRoles = [EUserRole.ADMIN, EUserRole.MODERATOR];

const routes: Routes = [
  {
    path: '',
    component: ShellPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardPage,
      },
      {
        path: EEntity.USERS,
        loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule),
        canMatch: [() => RolesGuard(allowedRoles)],
        data: { entity: EEntity.USERS },
      },
      {
        path: EEntity.SUBJECTS,
        loadChildren: () =>
          import('./modules/subjects/subjects.module').then((m) => m.SubjectsModule),
        canMatch: [() => RolesGuard(allowedRoles)],
        data: { entity: EEntity.SUBJECTS },
      },
      {
        path: EEntity.TOPICS,
        loadChildren: () => import('./modules/topics/topics.module').then((m) => m.TopicsModule),
        canMatch: [() => RolesGuard(allowedRoles)],
        data: { entity: EEntity.TOPICS },
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
