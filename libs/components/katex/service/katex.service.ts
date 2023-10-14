import { ElementRef, Injectable } from '@angular/core';
import katex, { KatexOptions } from 'katex';

@Injectable()
export class KatexService {
  constructor() {}

  public render(equation: string, element: ElementRef, options?: KatexOptions): void {
    katex.render(equation, element.nativeElement, options);
  }

  public renderToString(equation: string, options?: KatexOptions): string {
    return katex.renderToString(equation, options);
  }
}
