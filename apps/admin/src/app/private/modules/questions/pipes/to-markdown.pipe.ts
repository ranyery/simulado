import { inject, Pipe, PipeTransform } from '@angular/core';

import { HtmlToMarkdownService } from '../services/html-to-markdown.service';

@Pipe({ name: 'toMarkdown' })
export class ToMarkdownPipe implements PipeTransform {
  private readonly _htmlToMarkdownService = inject(HtmlToMarkdownService);

  transform(html: string): string {
    return this._htmlToMarkdownService.convert(html);
  }
}
