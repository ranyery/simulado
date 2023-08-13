import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private _primeNGConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this._disableUndesiredBehaviors();
    this._primeNGConfig.ripple = true;
  }

  private _disableUndesiredBehaviors() {
    if (!environment.production) return;

    const appRootElement = this._elementRef.nativeElement;

    this._renderer.setAttribute(appRootElement, 'oncontextmenu', 'return false');
    this._renderer.setAttribute(appRootElement, 'ondragstart', 'return false');
    this._renderer.setAttribute(appRootElement, 'onselectstart', 'return false');
  }
}
