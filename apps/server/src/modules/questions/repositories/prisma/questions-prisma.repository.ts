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
    return this._prismaService.question.findMany() as unknown as IQuestion[];
  }

  async findById(id: string): Promise<IQuestion | null> {
    return this._prismaService.question.findUnique({
      where: { id },
    }) as unknown as IQuestion | null;
  }

  async create(data: CreateQuestionRequestDTO): Promise<IQuestion> {
    return this._prismaService.question.create({ data }) as unknown as IQuestion;
  }

  async updateById(id: string, data: PartialQuestionRequestDTO): Promise<IQuestion | null> {
    return this._prismaService.question.update({
      where: { id },
      data,
    }) as unknown as IQuestion | null;
  }

  async deleteById(id: string): Promise<IQuestion | null> {
    return this._prismaService.question.delete({ where: { id } }) as unknown as IQuestion | null;
  }
}
