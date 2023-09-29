import { ITopic } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../infra/database/prisma.service';
import { CreateTopicRequestDTO } from '../../schemas/create-topic.schema';
import { PartialTopicRequestDTO } from '../../schemas/partial-topic.schema';
import { ITopicsRepository } from '../topics.repository';

@Injectable()
export class TopicsPrismaRepository implements ITopicsRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async findAll(): Promise<ITopic[]> {
    return this._prismaService.topic.findMany();
  }

  async findById(id: string): Promise<ITopic | null> {
    return this._prismaService.topic.findUnique({ where: { id } });
  }

  async create(data: CreateTopicRequestDTO): Promise<ITopic> {
    return this._prismaService.topic.create({ data });
  }

  async updateById(id: string, data: PartialTopicRequestDTO): Promise<ITopic | null> {
    return this._prismaService.topic.update({ where: { id }, data });
  }

  async deleteById(id: string): Promise<void> {
    await this._prismaService.topic.delete({ where: { id } });
    // await this._prismaService.topic.update({
    //   where: { id },
    //   data: { status: ETopicStatus.ARCHIVED, updatedAt: new Date() },
    // });
  }
}
