import { Component, inject, OnInit } from '@angular/core';
import { ISubject } from '@libs/shared/domain';
import { finalize } from 'rxjs';

import { SubjectsService } from '../../../../shared/services/subjects.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  private readonly _subjectsService = inject(SubjectsService);

  public subjects: ISubject[] = [];

  public isLoading: boolean = true;
  public hasError: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this._getAllSubjects();
  }

  private _getAllSubjects(): void {
    this.isLoading = true;
    this.hasError = false;

    this._subjectsService
      .getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (subjects) => {
          this.subjects = subjects;
          this.hasError = false;
        },
        error: () => (this.hasError = true),
      });
  }
}
