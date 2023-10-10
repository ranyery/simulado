import { IQuestion } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../infra/database/prisma.service';
import { CreateQuestionRequestDTO } from '../../schemas/create-question.schema';
import { PartialQuestionRequestDTO } from '../../schemas/partial-question.schema';
import { IQuestionsRepository } from '../questions.repository';

@Injectable()
export class QuestionsPrismaRepository implements IQuestionsRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async findAll(): Promise<IQuestion[]> {
    return this._prismaService.question.findMany();
  }

  async findById(id: string): Promise<IQuestion | null> {
    return this._prismaService.question.findUnique({ where: { id } });
  }

  async create(data: CreateQuestionRequestDTO): Promise<IQuestion> {
    return this._prismaService.question.create({ data });
  }

  async updateById(id: string, data: PartialQuestionRequestDTO): Promise<IQuestion | null> {
    return this._prismaService.question.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteById(id: string): Promise<void> {
    await this._prismaService.question.delete({ where: { id } });
    // await this._prismaService.question.update({
    //   where: { id },
    //   data: { status: EQuestionStatus.ARCHIVED, updatedAt: new Date() },
    // });
  }
}
