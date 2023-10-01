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
    const questions = await this._prismaService.question.findMany();

    return questions.map((question) => {
      return {
        ...question,
        answerOptions: JSON.parse(question.answerOptions),
        source: JSON.parse(question.source),
      } as IQuestion;
    });
  }

  async findById(id: string): Promise<IQuestion | null> {
    const question = await this._prismaService.question.findUnique({ where: { id } });

    if (!question) {
      return null;
    }

    return {
      ...question,
      answerOptions: JSON.parse(question.answerOptions),
      source: JSON.parse(question.source),
    } as IQuestion;
  }

  async create(data: CreateQuestionRequestDTO): Promise<IQuestion> {
    const { answerOptions, source } = data;
    const parsedData = {
      ...data,
      answerOptions: JSON.stringify(answerOptions),
      source: JSON.stringify(source),
    };

    const question = await this._prismaService.question.create({ data: parsedData });

    return {
      ...question,
      answerOptions: JSON.parse(question.answerOptions),
      source: JSON.parse(question.source),
    } as IQuestion;
  }

  async updateById(id: string, data: PartialQuestionRequestDTO): Promise<IQuestion | null> {
    const { answerOptions, source } = data;
    const parsedData = {
      ...data,
      answerOptions: JSON.stringify(answerOptions),
      source: JSON.stringify(source),
    };

    const question = await this._prismaService.question.update({
      where: { id },
      data: { ...parsedData, updatedAt: new Date() },
    });

    if (!question) {
      return null;
    }

    return {
      ...question,
      answerOptions: JSON.parse(question.answerOptions),
      source: JSON.parse(question.source),
    } as IQuestion;
  }

  async deleteById(id: string): Promise<void> {
    await this._prismaService.question.delete({ where: { id } });
    // await this._prismaService.question.update({
    //   where: { id },
    //   data: { status: EQuestionStatus.ARCHIVED, updatedAt: new Date() },
    // });
  }
}
