import { inject, Pipe, PipeTransform } from '@angular/core';
import { IQuestion } from '@libs/shared/domain';

import { InstitutesState } from '../../institutes/state/institutes.state';
import { HtmlToMarkdownService } from '../services/html-to-markdown.service';

@Pipe({ name: 'statementToMarkdown' })
export class StatementToMarkdownPipe implements PipeTransform {
  private readonly _htmlToMarkdownService = inject(HtmlToMarkdownService);
  private readonly _institutesState = inject(InstitutesState);

  transform(question: IQuestion): string {
    const { instituteId, year, statement } = question;
    const institute = this._institutesState.getById(instituteId);
    const html = institute
      ? `<strong>(${institute.acronym}${year ? ' - ' + year : ''})</strong> ${statement}`
      : statement;

    const formattedHtml = html.replace(/\$(.*?)\$/g, function (_, content) {
      return '$\\scriptsize ' + content + '$';
    });

    return this._htmlToMarkdownService.convert(formattedHtml);
  }
}
