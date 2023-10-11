import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-rich-image',
  templateUrl: './rich-image.component.html',
  styleUrls: ['./rich-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichImageComponent {
  @Input({ required: true }) set src(value: string) {
    const hasProtocol = /https?:/.test(value);
    this.imageUrl = hasProtocol ? value : `${environment.baseUrl}/assets/images/${value}`;
  }

  @Input({ required: false }) alt: string = '';
  @Input({ required: false }) width?: string;
  @Input({ required: false }) title?: string;
  @Input({ required: false }) subtitle?: string;

  public imageUrl: string = '';
}
