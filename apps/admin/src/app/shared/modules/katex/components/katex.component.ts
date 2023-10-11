import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { KatexOptions } from 'katex';

@Component({
  selector: 'app-katex',
  template: `
    <span katex [equation]="equation" [options]="options" (someError)="hasError($event)"></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KatexComponent {
  @Input({ required: true }) equation: string = '';
  @Input({ required: false }) options?: KatexOptions;

  @Output() someError = new EventEmitter<unknown>();

  hasError(error: unknown) {
    this.someError.emit(error);
  }
}
