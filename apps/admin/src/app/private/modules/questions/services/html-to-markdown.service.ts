import { Injectable } from '@angular/core';
import TurndownService from 'turndown';

@Injectable({ providedIn: 'root' })
export class HtmlToMarkdownService {
  private _turndownService;

  constructor() {
    this._turndownService = new TurndownService();
  }

  public convert(html: string): string {
    return this._turndownService.turndown(html);
  }
}
