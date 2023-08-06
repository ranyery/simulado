import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CheckboxChangeEvent } from 'primeng/checkbox';

interface IAnswer {
  id: string;
  title: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  public readonly items = Array.from({ length: 100 }).fill(0);

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

  public onCheckboxChange(event: CheckboxChangeEvent): void {
    console.log('onChangeMarkForReview:', event);
  }

  public load(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this._changeDetectorRef.detectChanges();
    }, 1000);
  }
}
