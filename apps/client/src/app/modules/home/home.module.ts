import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuestionModule } from '@simulado/components';
import { ButtonModule } from 'primeng/button';

import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './pages/home.page';

@NgModule({
  declarations: [HomePage],
  imports: [CommonModule, HomeRoutingModule, QuestionModule, ButtonModule],
})
export class HomeModule {}
