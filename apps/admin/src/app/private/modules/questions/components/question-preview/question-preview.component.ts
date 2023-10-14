import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IQuestion } from '@libs/shared/domain';
import { IContent, processHTMLTextWithImageTags } from '@libs/shared/utils';

@Component({
  selector: 'app-question-preview',
  templateUrl: './question-preview.component.html',
  styleUrls: ['./question-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionPreviewComponent implements OnInit, OnChanges {
  @Input({ required: true }) question!: IQuestion;

  public contentParts: IContent[] = [];

  public readonly upperLetters: string[] = ['A', 'B', 'C', 'D', 'E'];
  public form = new FormGroup({
    selectedAnswer: new FormControl(),
  });

  ngOnInit(): void {
    this.contentParts = processHTMLTextWithImageTags(this.question.statement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question'].currentValue) {
      this.contentParts = processHTMLTextWithImageTags(changes['question'].currentValue.statement);
    }
  }
}
