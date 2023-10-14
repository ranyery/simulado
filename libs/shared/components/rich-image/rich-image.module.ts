import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from 'primeng/image';

import { RichImageComponent } from './rich-image.component';

@NgModule({
  declarations: [RichImageComponent],
  imports: [CommonModule, ImageModule],
  exports: [RichImageComponent],
})
export class RichImageModule {}
