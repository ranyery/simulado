import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FindInstitutePipe } from './find-institute.pipe';
import { FindRelatedTopicPipe } from './find-related-topics.pipe';
import { FindSubjectPipe } from './find-subject.pipe';

@NgModule({
  declarations: [FindInstitutePipe, FindRelatedTopicPipe, FindSubjectPipe],
  imports: [CommonModule],
  exports: [FindInstitutePipe, FindRelatedTopicPipe, FindSubjectPipe],
})
export class QuestionPipesModule {}
