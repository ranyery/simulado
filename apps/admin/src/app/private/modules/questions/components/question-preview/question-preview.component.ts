import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IQuestion } from '@libs/shared/domain';

@Component({
  selector: 'app-question-preview',
  templateUrl: './question-preview.component.html',
  styleUrls: ['./question-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionPreviewComponent {
  @Input({ required: true }) question!: IQuestion;

  public readonly upperLetters: string[] = ['A', 'B', 'C', 'D', 'E'];
  public form = new FormGroup({
    selectedAnswer: new FormControl(),
  });
}
