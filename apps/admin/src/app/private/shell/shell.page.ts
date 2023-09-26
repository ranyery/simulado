import { Component, OnInit } from '@angular/core';

import motivationalPhrases from './../../../assets/data/json/motivational-phrases.json';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.page.html',
  styleUrls: ['./shell.page.scss'],
})
export class ShellPage implements OnInit {
  private _motivationalPhrases: string[] = motivationalPhrases;
  public selectedMotivationalPhrase: string = '';

  ngOnInit(): void {
    const maxValue = this._motivationalPhrases.length;
    const randomValue = Math.floor(Math.random() * maxValue - 1);
    this.selectedMotivationalPhrase = this._motivationalPhrases[randomValue];
  }
}
