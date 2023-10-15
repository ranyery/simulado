import { Component, inject, OnInit } from '@angular/core';
import { IQuestion } from '@simulado/domain';

import { QuestionsService } from '../../../shared/services/questions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private readonly _questionsService = inject(QuestionsService);

  public questions: IQuestion[] = [];

  public selectedQuestion?: IQuestion;
  public showList: boolean = true;
  public isLoading: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.isLoading = true;
    this._questionsService.getAll({ top: 20, skip: 0, orderBy: 'asc' }).subscribe({
      next: (questions) => {
        this.questions = questions;
        this.selectedQuestion = questions[0];
        this.isLoading = false;
      },
      error: () => {},
    });
  }

  public updateSelectedQuestion(questionId: string): void {
    const selectedQuestion = this.questions.find((q) => q.id === questionId);
    this.selectedQuestion = selectedQuestion;
  }

  public toggleShowList(): void {
    this.showList = !this.showList;
  }
}
