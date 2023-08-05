import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface IAnswer {
  id: string;
  title: string;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent implements OnInit {
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

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.topics = ['Matemática Financeira', 'Regra de três', 'Equação de 1º grau'];
  }

  public load(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this._changeDetectorRef.detectChanges();
    }, 1000);
  }
}
