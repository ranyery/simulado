import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FindInstitutePipe } from './find-institute.pipe';
import { FindTopicPipe } from './find-related-topics.pipe';
import { FindSubjectPipe } from './find-subject.pipe';

@NgModule({
  declarations: [FindInstitutePipe, FindTopicPipe, FindSubjectPipe],
  imports: [CommonModule],
  exports: [FindInstitutePipe, FindTopicPipe, FindSubjectPipe],
})
export class QuestionPipesModule {}
