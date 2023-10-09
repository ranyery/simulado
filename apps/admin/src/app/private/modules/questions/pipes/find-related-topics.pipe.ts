import { inject, Pipe, PipeTransform } from '@angular/core';

import { TopicsState } from '../../topics/state/topics.state';

@Pipe({ name: 'findRelatedTopics' })
export class FindRelatedTopicsPipe implements PipeTransform {
  private readonly _topicsState = inject(TopicsState);

  transform(subjectIds: string[]): string[] {
    const topicNames: string[] = [];

    subjectIds.forEach((subjectId) => {
      const topic = this._topicsState.getById(subjectId);

      if (!topic) {
        return;
      }

      topicNames.push(topic.name);
    });

    return topicNames;
  }
}
