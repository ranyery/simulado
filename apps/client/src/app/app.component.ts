import { Component, HostListener, OnInit } from '@angular/core';
import { inject as injectVercelAnalytics } from '@vercel/analytics';
import { PrimeNGConfig } from 'primeng/api';
import { fromEvent, merge } from 'rxjs';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _primeNGConfig: PrimeNGConfig) {
    if (environment.production) {
      injectVercelAnalytics();

      merge(
        fromEvent(document, 'contextmenu'),
        fromEvent(document, 'dragstart'),
        fromEvent(document, 'selectstart')
      ).subscribe((event: Event) => event.preventDefault());
    }
  }

  ngOnInit(): void {
    this._primeNGConfig.ripple = true;
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (environment.production) {
      // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + Shift + C, Ctrl + U
      if (
        event.code === 'F12' ||
        (event.ctrlKey && event.shiftKey && event.key === 'I') ||
        (event.ctrlKey && event.shiftKey && event.key === 'J') ||
        (event.ctrlKey && event.shiftKey && event.key === 'C') ||
        (event.ctrlKey && event.key === 'u')
      ) {
        event.preventDefault();
      }
    }
  }
}
