import { IInstitute } from '@simulado/domain';

import { CreateInstituteRequestDTO } from '../schemas/create-institute.schema';
import { PartialInstituteRequestDTO } from '../schemas/partial-institute.schema';

export abstract class IInstitutesRepository {
  abstract create(data: CreateInstituteRequestDTO): Promise<IInstitute>;
  abstract findAll(): Promise<IInstitute[]>;
  abstract findById(id: string): Promise<IInstitute | null>;
  abstract updateById(id: string, data: PartialInstituteRequestDTO): Promise<IInstitute | null>;
  abstract deleteById(id: string): Promise<void>;
}
