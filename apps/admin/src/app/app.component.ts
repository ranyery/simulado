import { Component, inject, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

import { ToastService } from './shared/services/toast.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <p-toast [position]="toastService.position"></p-toast>
  `,
})
export class AppComponent implements OnInit {
  public readonly toastService = inject(ToastService);
  private readonly _primeNGConfig = inject(PrimeNGConfig);

  constructor() {}

  ngOnInit(): void {
    this._primeNGConfig.ripple = true;
  }
}
