import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { NgStringPipesModule } from 'ngx-pipes';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { RichImageModule } from '../../../shared/components/rich-image/rich-image.module';
import { PermissionsDirectivesModule } from '../../../shared/directives/permissions/permissions-directives.module';
import { KatexModule } from '../../../shared/modules/katex/katex.module';
import { QuestionPreviewComponent } from './components/question-preview/question-preview.component';
import { QuestionCrudPage } from './pages/question-crud/question-crud.page';
import { QuestionListPage } from './pages/question-list/question-list.page';
import { FindInstitutePipe } from './pipes/find-institute.pipe';
import { FindRelatedTopicPipe } from './pipes/find-related-topics.pipe';
import { FindSubjectPipe } from './pipes/find-subject.pipe';
import { QuestionsRoutingModule } from './questions-routing.module';

@NgModule({
  declarations: [
    QuestionListPage,
    FindSubjectPipe,
    FindRelatedTopicPipe,
    FindInstitutePipe,
    QuestionCrudPage,
    QuestionPreviewComponent,
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
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
    MultiSelectModule,
    InputNumberModule,
    RadioButtonModule,
    CheckboxModule,
    RichImageModule,
    KatexModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
  ],
})
export class QuestionsModule {}
