import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';

import { QuestionFeedbackModule } from '../../shared/components/question-feedback/question-feedback.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './pages/home.page';

@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    RadioButtonModule,
    ButtonModule,
    QuestionFeedbackModule,
  ],
})
export class HomeModule {}
