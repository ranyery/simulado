import { IInstitute } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../infra/database/prisma.service';
import { CreateInstituteRequestDTO } from '../../schemas/create-institute.schema';
import { PartialInstituteRequestDTO } from '../../schemas/partial-institute.schema';
import { IInstitutesRepository } from '../institutes.repository';

@Injectable()
export class InstitutePrismaRepository implements IInstitutesRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(data: CreateInstituteRequestDTO): Promise<IInstitute> {
    return this._prismaService.institute.create({ data });
  }

  async findAll(): Promise<IInstitute[]> {
    return this._prismaService.institute.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findById(id: string): Promise<IInstitute | null> {
    return this._prismaService.institute.findUnique({ where: { id } });
  }

  async updateById(id: string, data: PartialInstituteRequestDTO): Promise<IInstitute | null> {
    return this._prismaService.institute.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteById(id: string): Promise<void> {
    await this._prismaService.institute.delete({ where: { id } });
  }
}
