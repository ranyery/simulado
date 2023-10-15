import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IQuestion } from '@simulado/domain';
import { ContentService, IContent } from '@simulado/services';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent implements OnInit, OnChanges {
  @Input({ required: true }) question?: IQuestion;

  private readonly _contentService = inject(ContentService);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);

  public readonly upperLetters: string[] = ['A', 'B', 'C', 'D', 'E'];
  public topics: string[] = ['Matemática Financeira', 'Regra de três', 'Equação de 1º grau'];
  public contentParts: IContent[] = [];
  public isLoading: boolean = false;

  public form = new FormGroup({
    indexSelectedAnswer: new FormControl<number | undefined>(undefined),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']) {
      const question = changes['question'].currentValue as IQuestion;
      if (!question) return;

      this.contentParts = this._contentService.processHTMLTextWithImageTags(question.statement);
      this.form.controls['indexSelectedAnswer'].setValue(undefined, { emitEvent: false });
    }
  }

  ngOnInit(): void {}

  public load(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this._changeDetectorRef.detectChanges();
    }, 1000);
  }
}
