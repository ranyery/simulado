import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuestionModule } from '@simulado/components';
import { ButtonModule } from 'primeng/button';

import { QuestionFeedbackModule } from '../../shared/components/question-feedback/question-feedback.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './pages/home.page';

@NgModule({
  declarations: [HomePage],
  imports: [CommonModule, HomeRoutingModule, QuestionModule, ButtonModule, QuestionFeedbackModule],
})
export class HomeModule {}
