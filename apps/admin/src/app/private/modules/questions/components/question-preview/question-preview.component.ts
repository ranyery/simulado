import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IQuestion } from '@libs/shared/domain';

import { ContentService, IContent } from '../../../../../shared/services/content.service';

@Component({
  selector: 'app-question-preview',
  templateUrl: './question-preview.component.html',
  styleUrls: ['./question-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionPreviewComponent implements OnInit, OnChanges {
  @Input({ required: true }) question!: IQuestion;

  private readonly _contentService = inject(ContentService);
  public contentParts: IContent[] = [];

  public readonly upperLetters: string[] = ['A', 'B', 'C', 'D', 'E'];
  public form = new FormGroup({
    selectedAnswer: new FormControl(),
  });

  ngOnInit(): void {
    this.contentParts = this._contentService.processAndCategorize(this.question.statement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question'].currentValue) {
      this.contentParts = this._contentService.processAndCategorize(
        changes['question'].currentValue.statement
      );
    }
  }

  // Mocks

  // <app-rich-image src="http://localhost:4200/assets/images/pyramid.png"></app-rich-image>
  html: string = `
    HTML: <div>You can write html, that contains expressions like this: $x ^ 2 + 5$ inside them. As you probably know. You also can write expressions in display mode as follows: $$\\sum_{i=1}^n(x_i^2 - \\overline{x}^2)$$ In first case you will need to use \\$expression\\$ and in the second one \\$\\$expression\\$\\$. To scape the \\$ symbol it's mandatory to write as follows: \\\\$</div><p>: <button>I'm a button</button></p>
  `;

  paragraph: string = `
    PARAGRAPH: You can write text, that contains expressions like this: $x ^ 2 + 5$ inside them. As you probably know.
    You also can write expressions in display mode as follows: $$\\sum_{i=1}^n(x_i^2 - \\overline{x}^2)$$
    In first case you will need to use \\$expression\\$ and in the second one \\$\\$expression\\$\\$.
    To scape the \\$ symbol it's mandatory to write as follows: \\\\$
  `;
}
