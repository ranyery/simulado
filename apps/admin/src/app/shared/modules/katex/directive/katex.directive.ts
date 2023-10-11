import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { KatexOptions } from 'katex';

import { KatexService } from '../service/katex.service';

@Directive({ selector: '[katex]' })
export class KatexDirective implements OnChanges {
  private readonly _elementRef = inject(ElementRef);
  private readonly _katexService = inject(KatexService);

  @Input({ required: true }) equation: string = '';
  @Input({ required: false }) options?: KatexOptions;

  @Output() someError = new EventEmitter<unknown>();

  ngOnChanges() {
    try {
      this._katexService.render(this.equation, this._elementRef, this.options);
    } catch (e) {
      this.someError.emit(e);
    }
  }
}
