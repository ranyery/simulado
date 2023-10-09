import { IExam } from '@libs/shared/domain';

import { CreateExamRequestDTO } from '../schemas/create-exam.schema';
import { PartialExamRequestDTO } from '../schemas/partial-exam.schema';

export abstract class IExamsRepository {
  abstract create(data: CreateExamRequestDTO): Promise<IExam>;
  abstract findAll(): Promise<IExam[]>;
  abstract findById(id: string): Promise<IExam | null>;
  abstract updateById(id: string, data: PartialExamRequestDTO): Promise<IExam | null>;
  abstract deleteById(id: string): Promise<void>;
}
