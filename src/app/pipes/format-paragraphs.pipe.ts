// format-paragraphs.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatParagraphs'
})
export class FormatParagraphsPipe implements PipeTransform {
  transform(content: string): string {
    // Assume que o conteúdo é uma string com quebras de linha, dividindo em parágrafos
    const paragraphs = content.split('\n').map(para => `<p>${para}</p>`).join('');
    return paragraphs;
  }
}
