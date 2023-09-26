import { ISubject } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../infra/database/prisma.service';
import { PartialSubjectRequestDTO } from '../../schemas/partial-subject.schema';
import { ISubjectsRepository } from '../subjects.repository';

@Injectable()
export class SubjectsPrismaRepository implements ISubjectsRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async findAll(): Promise<ISubject[]> {
    return this._prismaService.subjects.findMany();
  }

  async findById(id: string): Promise<ISubject | null> {
    return this._prismaService.subjects.findUnique({ where: { id } });
  }

  async create(data: PartialSubjectRequestDTO): Promise<ISubject> {
    return this._prismaService.subjects.create({ data });
  }

  async updateById(id: string, data: PartialSubjectRequestDTO): Promise<ISubject | null> {
    return this._prismaService.subjects.update({ where: { id }, data });
  }

  async deleteById(id: string): Promise<ISubject | null> {
    return this._prismaService.subjects.delete({ where: { id } });
  }
}
