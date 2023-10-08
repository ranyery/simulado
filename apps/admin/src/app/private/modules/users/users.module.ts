import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgStringPipesModule } from 'ngx-pipes';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { PermissionsDirectivesModule } from '../../../shared/directives/permissions/permissions-directives.module';
import { UsersPage } from './page/users.page';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UsersPage],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule,
    InputTextModule,
    TooltipModule,
    NgStringPipesModule,
    PermissionsDirectivesModule,
    TagModule,
  ],
})
export class UsersModule {}
