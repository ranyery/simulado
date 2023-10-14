import { inject, Pipe, PipeTransform } from '@angular/core';
import { TopicsState } from '@simulado/services';

@Pipe({ name: 'findTopic' })
export class FindTopicPipe implements PipeTransform {
  private readonly _topicsState = inject(TopicsState);

  transform(topicId: string): string {
    const topic = this._topicsState.getById(topicId);

    if (!topic) {
      return '';
    }

    return topic.name;
  }
}
