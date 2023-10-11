import { Injectable } from '@angular/core';

type ContentType = 'text' | 'image' | 'markdown';
export interface IContent {
  text: string;
  type: ContentType;
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  constructor() {}

  public processAndCategorize(text: string): IContent[] {
    const substrings = text.split('|'); // Padronização para identificar onde começa e termina o markdown
    const markdownRegex = /\$.*?\$/g; // O texto em questão começa e finaliza com o caractere '$'
    const imageRegex = /(<img[^>]*>)/; // Identifica se há uma imagem
    const result: IContent[] = [];

    for (const str of substrings) {
      const isMarkdown = markdownRegex.test(str);
      const hasImage = imageRegex.test(str);

      if (isMarkdown) {
        const textScriptsized = str.replace('$', '$\\scriptsize ');
        result.push({ text: textScriptsized, type: 'markdown' });
        continue;
      }

      if (hasImage) {
        const parts = str.split(imageRegex);

        for (const part of parts) {
          const isImage = imageRegex.test(part);

          if (isImage) {
            // TODO: Criar algo meu para identificar as imagens
            const sourceRegex = /src=['"](.*?)['"]/;
            result.push({ text: part.match(sourceRegex)?.[1] ?? '', type: 'image' });
            continue;
          }

          result.push({ text: part, type: 'text' });
        }

        continue;
      }

      result.push({ text: str, type: 'text' });
    }

    return result;
  }
}
