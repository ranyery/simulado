import { Component, inject, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <p-toast position="top-center"></p-toast>
    <p-confirmDialog [style]="{ width: '50vw' }"></p-confirmDialog>
  `,
})
export class AppComponent implements OnInit {
  private readonly _primeNGConfig = inject(PrimeNGConfig);

  constructor() {}

  ngOnInit(): void {
    this._primeNGConfig.ripple = true;
  }
}
