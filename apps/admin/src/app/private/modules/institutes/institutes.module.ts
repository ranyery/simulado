import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgStringPipesModule } from 'ngx-pipes';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { PermissionsDirectivesModule } from '../../../shared/directives/permissions/permissions-directives.module';
import { FormInstituteComponent } from './components/form-institute/form-institute.component';
import { InstitutesRoutingModule } from './institutes-routing.module';
import { InstitutesPage } from './page/institutes.page';

@NgModule({
  declarations: [InstitutesPage, FormInstituteComponent],
  imports: [
    CommonModule,
    InstitutesRoutingModule,
    ButtonModule,
    TableModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    TooltipModule,
    NgStringPipesModule,
    PermissionsDirectivesModule,
  ],
})
export class InstitutesModule {}
