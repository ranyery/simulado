import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionPipesModule } from '@simulado/pipes';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SkeletonModule } from 'primeng/skeleton';

import { KatexModule } from './../katex/katex.module';
import { RichImageModule } from './../rich-image/rich-image.module';
import { QuestionComponent } from './question.component';

@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuestionPipesModule,
    ButtonModule,
    RadioButtonModule,
    SkeletonModule,
    KatexModule,
    RichImageModule,
  ],
  exports: [QuestionComponent],
})
export class QuestionModule {}
