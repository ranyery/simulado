import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IQuestion } from '@simulado/domain';
import { ContentService, IContent } from '@simulado/services';

import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private readonly _contentService = inject(ContentService);
  private readonly _questionsService = inject(QuestionsService);

  public question?: IQuestion;
  public contentParts: IContent[] = [];
  public showList: boolean = true;

  public readonly items = Array.from({ length: 65 }).fill(0);

  public isLoading: boolean = true;
  public readonly upperLetters: string[] = ['A', 'B', 'C', 'D', 'E'];
  public topics: string[] = ['Matemática Financeira', 'Regra de três', 'Equação de 1º grau'];

  public form = new FormGroup({
    selectedAnswer: new FormControl(),
  });

  constructor() {}

  ngOnInit(): void {
    this.isLoading = true;
    this._questionsService.getById('clnmugcrp002ewmt81s5mtycu').subscribe({
      next: (question) => {
        this.contentParts = this._contentService.processHTMLTextWithImageTags(question.statement);
        this.question = question;
        this.isLoading = false;
      },
      error: () => {},
    });
  }

  public load(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  public toggleShowList(): void {
    this.showList = !this.showList;
  }
}
