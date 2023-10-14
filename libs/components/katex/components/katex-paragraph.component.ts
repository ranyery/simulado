import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Segment, extractMath } from 'extract-math';

@Component({
  selector: 'app-katex-paragraph',
  template: `
    <p [ngStyle]="{ 'font-size': fontSize }">
      <ng-container *ngFor="let segment of segments">
        <app-katex
          *ngIf="segment.math; else text"
          [equation]="segment.raw"
          [options]="{ displayMode: segment.type === 'display' }">
        </app-katex>
        <ng-template #text>{{ segment.value }}</ng-template>
      </ng-container>
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KatexParagraphComponent {
  public segments: Segment[] = [];

  private _paragraph: string = '';

  @Input({ required: false }) fontSize: string = '16px';
  @Input() set paragraph(paragraph: string) {
    if (paragraph !== this._paragraph) {
      this._paragraph = paragraph;
      this.segments = extractMath(this._paragraph);
    }
  }
}
