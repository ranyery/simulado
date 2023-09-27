import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

type ButtonColor = 'RED' | 'GREEN' | 'BLUE' | 'YELLOW';
type ButtonSize = 'SMALL' | 'NORMAL';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input() color: ButtonColor = 'GREEN';
  @Input() title: string = '';
  @Input() size: ButtonSize = 'NORMAL';

  constructor() {}

  ngOnInit(): void {}
}
