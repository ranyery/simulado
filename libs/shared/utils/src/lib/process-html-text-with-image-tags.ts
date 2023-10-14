type ContentType = 'text' | 'image';

export interface IContent {
  type: ContentType;
  content?: string;
  src?: string;
  alt?: string;
  width?: string;
  title?: string;
  subtitle?: string;
}

export function processHTMLTextWithImageTags(html: string): IContent[] {
  if (!html) return [];

  const regex = /(<img[^>]*>)/g;
  const parts = html.split(regex);
  const result: IContent[] = [];

  for (const part of parts) {
    if (part.includes('<img')) {
      result.push({
        type: 'image',
        src: part.match(/src=["'](.*?)["']/)?.[1],
        alt: part.match(/alt=["'](.*?)["']/)?.[1],
        width: part.match(/width=["'](.*?)["']/)?.[1],
        title: part.match(/\btitle=["'](.*?)["']/)?.[1],
        subtitle: part.match(/\bsubtitle=["'](.*?)["']/)?.[1],
      });
    } else {
      result.push({ type: 'text', content: part });
    }
  }

  return result;
}
