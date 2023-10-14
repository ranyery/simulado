import { Component, inject, OnInit } from '@angular/core';
import { IQuestion } from '@simulado/domain';
import { delay } from 'rxjs';

import { QuestionsService } from '../../../shared/services/questions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private readonly _questionsService = inject(QuestionsService);

  public question?: IQuestion;
  public showList: boolean = true;

  public isLoading: boolean = true;
  public readonly items = Array.from({ length: 65 }).fill(0);

  constructor() {}

  ngOnInit(): void {
    this.isLoading = true;
    this._questionsService
      .getById('clnmvkg4i002iwmt8mz7lfiuv')
      .pipe(delay(1000))
      .subscribe({
        next: (question) => {
          this.question = question;
          this.isLoading = false;
        },
        error: () => {},
      });
  }

  public toggleShowList(): void {
    this.showList = !this.showList;
  }
}
