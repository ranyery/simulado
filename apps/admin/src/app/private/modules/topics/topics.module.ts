import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgStringPipesModule } from 'ngx-pipes';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { PermissionsDirectivesModule } from '../../../shared/directives/permissions/permissions-directives.module';
import { FormTopicComponent } from './components/form-topic/form-topic.component';
import { TopicsPage } from './page/topics.page';
import { FindSubjectByIdPipe } from './pipes/find-subject-by-id.pipe';
import { TopicsRoutingModule } from './topics-routing.module';

@NgModule({
  declarations: [TopicsPage, FormTopicComponent, FindSubjectByIdPipe],
  imports: [
    CommonModule,
    TopicsRoutingModule,
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
    CheckboxModule,
    InputSwitchModule,
  ],
})
export class TopicsModule {}
