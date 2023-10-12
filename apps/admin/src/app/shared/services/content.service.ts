import { Injectable } from '@angular/core';

type ContentType = 'text' | 'image';
export interface IContent {
  type: ContentType;
  content?: string;
  src?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  constructor() {}

  public processHTMLTextWithImageTags(html: string): IContent[] {
    const regex = /(<img[^>]*>)/g;
    const parts = html.split(regex);
    const result: IContent[] = [];

    for (const part of parts) {
      if (part.includes('<img')) {
        result.push({
          type: 'image',
          src: part.match(/src=["'](.*?)["']/)?.[1],
          alt: part.match(/alt=["'](.*?)["']/)?.[1],
          title: part.match(/title=["'](.*?)["']/)?.[1],
          subtitle: part.match(/subtitle=["'](.*?)["']/)?.[1],
        });
      } else {
        result.push({
          type: 'text',
          content: part,
        });
      }
    }

    return result;
  }
}
