import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TopicsRoutingModule } from './topics-routing.module';
import { TopicsPage } from './page/topics.page';

@NgModule({
  declarations: [TopicsPage],
  imports: [CommonModule, TopicsRoutingModule],
})
export class TopicsModule {}
