import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  public readonly items = Array.from({ length: 65 }).fill(0);

  public form = new FormGroup({
    pending: new FormControl<boolean>(false),
  });
}
