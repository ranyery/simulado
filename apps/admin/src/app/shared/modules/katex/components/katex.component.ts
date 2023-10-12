import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { KatexOptions } from 'katex';

@Component({
  selector: 'app-katex',
  template: `
    <span
      katex
      [equation]="equation"
      [options]="options"
      [ngStyle]="{ 'font-size': fontSize }"
      (someError)="hasError($event)"></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KatexComponent {
  @Input({ required: true }) equation: string = '';
  @Input({ required: false }) options?: KatexOptions;
  @Input({ required: false }) fontSize: string = '16px';

  @Output() someError = new EventEmitter<unknown>();

  hasError(error: unknown) {
    this.someError.emit(error);
  }
}
