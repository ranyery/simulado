import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ExamsRoutingModule } from './exams-routing.module';
import { ExamsPage } from './page/exams.page';

@NgModule({
  declarations: [ExamsPage],
  imports: [CommonModule, ExamsRoutingModule],
})
export class ExamsModule {}
