import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IQuestion } from '@libs/shared/domain';
import { ContentService, IContent } from '@simulado/services';

import { QuestionsService } from '../services/questions.service';

interface IAnswer {
  id: string;
  title: string;
}

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

  public isLoading: boolean = false;
  public readonly upperLetters: string[] = ['A', 'B', 'C', 'D', 'E'];
  public answers: IAnswer[] = [
    { id: 'A', title: '2,40' },
    { id: 'B', title: '2,35' },
    { id: 'C', title: '2,45' },
    { id: 'D', title: '2,50' },
    { id: 'E', title: '2,55' },
  ];
  public topics: string[] = [];

  public form = new FormGroup({
    selectedAnswer: new FormControl(),
  });

  constructor() {}

  ngOnInit(): void {
    this.topics = ['Matemática Financeira', 'Regra de três', 'Equação de 1º grau'];
    this._questionsService.getById('clnmvkg4i002iwmt8mz7lfiuv').subscribe({
      next: (question) => {
        this.question = question;
        this.contentParts = this._contentService.processHTMLTextWithImageTags(
          this.question.statement
        );
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
