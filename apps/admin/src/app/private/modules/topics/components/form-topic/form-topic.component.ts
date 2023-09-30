import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ETopicStatus, ITopic } from '@libs/shared/domain';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ConfirmDialogService } from '../../../../../shared/services/confirm-dialog.service';
import { UtilsService } from '../../../../../shared/services/utils.service';
import { ETopicActions } from '../../page/topics.page';

interface ITopicStatus {
  name: string;
  code: ETopicStatus;
}

interface ISubjectStatus {
  name: string;
  code: string;
}

interface ITopicActionData {
  actionType: ETopicActions;
  topic: ITopic;
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

  public readonly topicStatus: ITopicStatus[] = [
    { name: 'Revisão pendente', code: ETopicStatus.PENDING_REVIEW },
    { name: 'Ativo', code: ETopicStatus.ACTIVE },
    { name: 'Arquivado', code: ETopicStatus.ARCHIVED },
  ];

  public readonly subjectList: ISubjectStatus[] = [
    { name: 'Matemática', code: '41961452-b607-4b88-bfcd-fe2d889f6dc6' },
    { name: 'Português', code: '8e3f8045-ca53-40e9-a6b8-4b01340d88f6' },
    { name: 'Geografia', code: '9d683442-2a1b-416a-8fa5-c657f03cf883' },
  ];

  public form = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string | undefined>(undefined),
    status: new FormControl<ITopicStatus | undefined>(undefined),
    subjectId: new FormControl<ISubjectStatus>(this.subjectList[0], [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {
    const { actionType, topic } = this._dynamicDialogConfig.data as ITopicActionData;

    if (actionType === ETopicActions.CREATE) {
      return;
    }

    if (actionType === ETopicActions.UPDATE) {
      const topicStatus = this.topicStatus.find((s) => s.code === topic.status);
      const subjectList = this.subjectList.find((s) => s.code === topic.status);

      this.form.controls['id'].setValue(topic.id);
      this.form.controls['name'].setValue(topic.name);
      this.form.controls['status'].setValue(topicStatus);
      this.form.controls['subjectId'].setValue(subjectList!);
      this.form.controls['description'].setValue(topic.description);
    }
  }

  public confirm(): void {
    const formTopicValues = this.form.value;
    const { topic } = this._dynamicDialogConfig.data as ITopicActionData;

    const topicId = topic.id ?? undefined;
    const subjectId = topic.subjectId ?? this.subjectList[0].code;
    const topicStatus = formTopicValues.status?.code ?? ETopicStatus.PENDING_REVIEW;

    const updatedTopic = this._utilsService.removeNullOrUndefinedOrEmptyProperties<ITopic>({
      ...topic,
      ...formTopicValues,
      id: topicId,
      status: topicStatus,
      subjectId: subjectId,
    });

    this._confirmDialogService.confirm(
      {
        title: 'Atenção!',
        message: `Deseja confirmar a criação do tópico <b>${updatedTopic.name}</b>?`,
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
