import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
