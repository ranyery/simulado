import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { KatexModule, RichImageModule } from '@simulado/components';
import { QuestionPipesModule } from '@simulado/pipes';
import { NgStringPipesModule } from 'ngx-pipes';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { PermissionsDirectivesModule } from '../../../shared/directives/permissions/permissions-directives.module';
import { QuestionPreviewComponent } from './components/question-preview/question-preview.component';
import { QuestionCrudPage } from './pages/question-crud/question-crud.page';
import { QuestionListPage } from './pages/question-list/question-list.page';
import { QuestionsRoutingModule } from './questions-routing.module';

@NgModule({
  declarations: [QuestionListPage, QuestionCrudPage, QuestionPreviewComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    TooltipModule,
    NgStringPipesModule,
    PermissionsDirectivesModule,
    MultiSelectModule,
    RadioButtonModule,
    RichImageModule,
    KatexModule,
    AngularEditorModule,
    QuestionPipesModule,
  ],
})
export class QuestionsModule {}
