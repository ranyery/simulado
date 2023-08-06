import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { QuestionFeedbackComponent } from './question-feedback.component';

@NgModule({
  declarations: [QuestionFeedbackComponent],
  imports: [CommonModule, ButtonModule],
  exports: [QuestionFeedbackComponent],
})
export class QuestionFeedbackModule {}
