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
import { FormQuestionComponent } from './components/form-question/form-question.component';
import { QuestionsPage } from './page/questions.page';
import { FindRelatedTopics } from './pipes/find-related-topics.pipe';
import { FindSubjectPipe } from './pipes/find-subject.pipe';
import { QuestionsRoutingModule } from './questions-routing.module';

@NgModule({
  declarations: [QuestionsPage, FormQuestionComponent, FindSubjectPipe, FindRelatedTopics],
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
  ],
})
export class QuestionsModule {}
