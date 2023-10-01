import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IfCanCreateDirective } from './if-can-create.directive';
import { IfCanDeleteDirective } from './if-can-delete.directive';
import { IfCanReadDirective } from './if-can-read.directive';
import { IfCanUpdateDirective } from './if-can-update.directive';
import { IfHasRoleDirective } from './if-has-role.directive';
import { IfIsAdminDirective } from './if-is-admin.directive';

@NgModule({
  declarations: [
    IfHasRoleDirective,
    IfCanCreateDirective,
    IfCanReadDirective,
    IfCanUpdateDirective,
    IfCanDeleteDirective,
    IfIsAdminDirective,
  ],
  imports: [CommonModule],
  exports: [
    IfHasRoleDirective,
    IfCanCreateDirective,
    IfCanReadDirective,
    IfCanUpdateDirective,
    IfCanDeleteDirective,
    IfIsAdminDirective,
  ],
})
export class PermissionsDirectivesModule {}
