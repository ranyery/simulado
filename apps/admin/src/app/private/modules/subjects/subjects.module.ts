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

import { FormSubjectComponent } from './components/form-subject/form-subject.component';
import { SubjectsPage } from './page/subjects.page';
import { SubjectsRoutingModule } from './subjects-routing.module';

@NgModule({
  declarations: [SubjectsPage, FormSubjectComponent],
  imports: [
    CommonModule,
    SubjectsRoutingModule,
    ButtonModule,
    TableModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    TooltipModule,
    NgStringPipesModule,
  ],
})
export class SubjectsModule {}
