import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KatexHtmlComponent } from './components/katex-html.component';
import { KatexParagraphComponent } from './components/katex-paragraph.component';
import { KatexComponent } from './components/katex.component';
import { KatexDirective } from './directive/katex.directive';
import { KatexService } from './service/katex.service';

// Based on: https://github.com/garciparedes/ng-katex => https://garciparedes.me/ng-katex/

@NgModule({
  declarations: [KatexDirective, KatexComponent, KatexHtmlComponent, KatexParagraphComponent],
  imports: [CommonModule],
  exports: [KatexComponent, KatexHtmlComponent, KatexParagraphComponent],
  providers: [KatexService],
})
export class KatexModule {}
