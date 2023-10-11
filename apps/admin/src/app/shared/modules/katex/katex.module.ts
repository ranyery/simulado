import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KatexHtmlComponent } from './components/katex-html.component';
import { KatexParagraphComponent } from './components/katex-paragraph.component';
import { KatexComponent } from './components/katex.component';
import { KatexDirective } from './directive/katex.directive';

@NgModule({
  declarations: [KatexDirective, KatexComponent, KatexHtmlComponent, KatexParagraphComponent],
  imports: [CommonModule],
  exports: [KatexComponent, KatexHtmlComponent, KatexParagraphComponent],
})
export class KatexModule {}
