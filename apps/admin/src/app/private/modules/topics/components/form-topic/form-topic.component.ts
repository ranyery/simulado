import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ETopicStatus, ISubject, ITopic } from '@libs/shared/domain';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';
import { UserRolesService } from '../../../../../shared/services/user-roles.service';
import { UtilsService } from '../../../../../shared/services/utils.service';
import { ETopicActions } from '../../page/topics.page';

interface ITopicStatus {
  name: string;
  code: ETopicStatus;
}

interface ISubjectOption {
  name: string;
  code: string;
}

interface ITopicActionData {
  actionType: ETopicActions;
  topic: ITopic;
  subjects: ISubject[];
}

@Component({
  selector: 'app-form-topic',
  templateUrl: './form-topic.component.html',
  styleUrls: ['./form-topic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTopicComponent implements OnInit {
  private readonly _dynamicDialogRef = inject(DynamicDialogRef);
  private readonly _dynamicDialogConfig = inject(DynamicDialogConfig);
  private readonly _confirmDialogService = inject(ConfirmDialogService);
  private readonly _utilsService = inject(UtilsService);
  private readonly _userRolesService = inject(UserRolesService);

  private _actionType?: ETopicActions;

  public readonly topicStatus: ITopicStatus[] = [
    { name: 'Revisão pendente', code: ETopicStatus.PENDING_REVIEW },
    { name: 'Ativo', code: ETopicStatus.ACTIVE },
    { name: 'Arquivado', code: ETopicStatus.ARCHIVED },
  ];

  public subjectOptions: ISubjectOption[] = [];

  public form = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string | undefined>(undefined),
    status: new FormControl<ITopicStatus | undefined>({
      value: this.topicStatus.find((topic) => topic.code === ETopicStatus.PENDING_REVIEW),
      disabled: !this._userRolesService.isAdmin(),
    }),
    subjectId: new FormControl<ISubjectOption | undefined>(undefined, [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {
    const { actionType, topic, subjects } = this._dynamicDialogConfig.data as ITopicActionData;
    this._actionType = actionType;

    this.subjectOptions = subjects.map<ISubjectOption>((s) => ({ name: s.name, code: s.id }));

    if (actionType === ETopicActions.CREATE) {
      this.form.controls['subjectId'].setValue(this.subjectOptions[0]);
      return;
    }

    if (actionType === ETopicActions.UPDATE) {
      const topicStatus = this.topicStatus.find((s) => s.code === topic.status);
      const selectedSubject = this.subjectOptions.find((s) => s.code === topic.subjectId);

      this.form.controls['id'].setValue(topic.id);
      this.form.controls['name'].setValue(topic.name);
      this.form.controls['description'].setValue(topic.description);
      this.form.controls['status'].setValue(topicStatus);
      this.form.controls['subjectId'].setValue(selectedSubject);
    }
  }

  public confirm(): void {
    const formTopicValues = this.form.value;
    const { topic } = this._dynamicDialogConfig.data as ITopicActionData;

    const subject = formTopicValues.subjectId;
    const topicStatus = formTopicValues.status?.code ?? ETopicStatus.PENDING_REVIEW;

    const updatedTopic = this._utilsService.removeNullOrUndefinedOrEmptyProperties<ITopic>({
      ...topic,
      ...formTopicValues,
      subjectId: subject?.code,
      status: topicStatus,
    });

    this._confirmDialogService.confirm(
      {
        title: 'Atenção!',
        message: `Deseja confirmar a ${
          this._actionType === ETopicActions.CREATE ? 'criação' : 'atualização'
        } do tópico <b>${updatedTopic.name}</b> para a matéria de <b>${subject?.name}</b>?`,
        type: 'info',
      },
      () => this._dynamicDialogRef.close({ topic: updatedTopic }),
      () => this.cancel()
    );
  }

  public cancel(): void {
    this._dynamicDialogRef.destroy();
  }
}
