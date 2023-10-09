import { IExam } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../infra/database/prisma.service';
import { CreateExamRequestDTO } from '../../schemas/create-exam.schema';
import { PartialExamRequestDTO } from '../../schemas/partial-exam.schema';
import { IExamsRepository } from '../exams.repository';

@Injectable()
export class ExamPrismaRepository implements IExamsRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(data: CreateExamRequestDTO): Promise<IExam> {
    return this._prismaService.exam.create({ data });
  }

  async findAll(): Promise<IExam[]> {
    return this._prismaService.exam.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findById(id: string): Promise<IExam | null> {
    return this._prismaService.exam.findUnique({ where: { id } });
  }

  async updateById(id: string, data: PartialExamRequestDTO): Promise<IExam | null> {
    return this._prismaService.exam.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteById(id: string): Promise<void> {
    await this._prismaService.exam.delete({ where: { id } });
  }
}
