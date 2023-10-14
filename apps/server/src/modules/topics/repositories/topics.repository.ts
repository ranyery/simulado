import { ITopic } from '@simulado/domain';

import { CreateTopicRequestDTO } from '../schemas/create-topic.schema';
import { PartialTopicRequestDTO } from '../schemas/partial-topic.schema';

export abstract class ITopicsRepository {
  abstract findAll(): Promise<ITopic[]>;
  abstract findById(id: string): Promise<ITopic | null>;
  abstract create(data: CreateTopicRequestDTO): Promise<ITopic>;
  abstract updateById(id: string, data: PartialTopicRequestDTO): Promise<ITopic | null>;
  abstract deleteById(id: string): Promise<void>;
}
