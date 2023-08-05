import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';

import { QuestionComponent } from './components/question/question.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './pages/home.page';

@NgModule({
  declarations: [HomePage, QuestionComponent],
  imports: [CommonModule, HomeRoutingModule, ReactiveFormsModule, RadioButtonModule, ButtonModule],
})
export class HomeModule {}
