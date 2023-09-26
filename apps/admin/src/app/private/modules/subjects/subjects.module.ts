import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SubjectsPage } from './page/subjects.page';
import { SubjectsRoutingModule } from './subjects-routing.module';

@NgModule({
  declarations: [SubjectsPage],
  imports: [CommonModule, SubjectsRoutingModule],
})
export class SubjectsModule {}
