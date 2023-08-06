import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-feedback',
  templateUrl: './question-feedback.component.html',
  styleUrls: ['./question-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionFeedbackComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input({ required: true }) questionId!: string;

  constructor() {}

  ngOnInit(): void {}
}
