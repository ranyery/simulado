import { createZodDto } from 'nestjs-zod';

import { TopicSchema } from './topic.schema';

export const CreateTopicRequestSchema = TopicSchema.pick({
  name: true,
  description: true,
  status: true,
  subjectId: true,
});

// Usar como referência de dados RECEBIDOS do Front-End
export class CreateTopicRequestDTO extends createZodDto(CreateTopicRequestSchema) {}
