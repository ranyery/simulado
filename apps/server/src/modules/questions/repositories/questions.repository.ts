import { IQueryParams, IQuestion } from '@libs/shared/domain';

import { CreateQuestionRequestDTO } from '../schemas/create-question.schema';
import { PartialQuestionRequestDTO } from '../schemas/partial-question.schema';

export abstract class IQuestionsRepository {
  abstract findAll(query: IQueryParams): Promise<IQuestion[]>;
  abstract findById(id: string): Promise<IQuestion | null>;
  abstract create(data: CreateQuestionRequestDTO): Promise<IQuestion>;
  abstract updateById(id: string, data: PartialQuestionRequestDTO): Promise<IQuestion | null>;
  abstract deleteById(id: string): Promise<void>;
}
