import { ISubject } from '@libs/shared/domain';

import { PartialSubjectRequestDTO } from '../schemas/partial-subject.schema';

export abstract class ISubjectsRepository {
  abstract findAll(): Promise<ISubject[]>;
  abstract findById(id: string): Promise<ISubject | null>;
  abstract create(data: PartialSubjectRequestDTO): Promise<ISubject>;
  abstract updateById(id: string, data: PartialSubjectRequestDTO): Promise<ISubject | null>;
  abstract deleteById(id: string): Promise<ISubject | null>;
}
