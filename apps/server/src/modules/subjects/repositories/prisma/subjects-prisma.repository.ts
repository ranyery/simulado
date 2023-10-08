import { ISubject } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../infra/database/prisma.service';
import { CreateSubjectRequestDTO } from '../../schemas/create-subject.schema';
import { PartialSubjectRequestDTO } from '../../schemas/partial-subject.schema';
import { ISubjectsRepository } from '../subjects.repository';

@Injectable()
export class SubjectsPrismaRepository implements ISubjectsRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async findAll(): Promise<ISubject[]> {
    return this._prismaService.subject.findMany();
  }

  async findById(id: string): Promise<ISubject | null> {
    return this._prismaService.subject.findUnique({ where: { id } });
  }

  async create(data: CreateSubjectRequestDTO): Promise<ISubject> {
    return this._prismaService.subject.create({ data });
  }

  async updateById(id: string, data: PartialSubjectRequestDTO): Promise<ISubject | null> {
    return this._prismaService.subject.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteById(id: string): Promise<void> {
    await this._prismaService.subject.delete({ where: { id } });
    // await this._prismaService.subject.update({
    //   where: { id },
    //   data: { status: ESubjectStatus.ARCHIVED, updatedAt: new Date() }
    // });
  }
}
