import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { extractMath, Segment } from 'extract-math';

import { KatexService } from '../service/katex.service';

@Component({
  selector: 'app-katex-html',
  template: `<span [ngStyle]="{ 'font-size': fontSize }" [innerHTML]="allHtml"></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KatexHtmlComponent {
  private readonly _domSanitizer = inject(DomSanitizer);
  private readonly _katexService = inject(KatexService);

  @Input({ required: false }) fontSize: string = '16px';
  @Input({ required: true })
  set html(html: string) {
    if (html !== this._html) {
      this._html = html;
      this._updateAllHtml();
    }
  }

  public allHtml: SafeHtml = '';

  private _html: string = '';
  private _segments: Segment[] = [];

  private _updateAllHtml() {
    if (!this._html) {
      this.allHtml = '';
      this._segments = [];
      return;
    }

    this._segments = extractMath(this._html);

    const allHtml = this._segments
      .map((seg) => {
        if (seg.math) {
          return this._katexService.renderToString(seg.raw, {
            displayMode: seg.type === 'display',
          });
        } else {
          return seg.value;
        }
      })
      .reduce((total, current) => {
        return (total += current);
      });
    this.allHtml = this._domSanitizer.bypassSecurityTrustHtml(allHtml);
  }

  public get segments(): Segment[] {
    return this._segments;
  }
}
