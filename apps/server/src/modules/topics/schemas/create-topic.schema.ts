import { createZodDto } from 'nestjs-zod';

import { TopicSchema } from './topic.schema';

export const CreateTopicRequestSchema = TopicSchema.omit({ id: true });

// Usar como referência de dados RECEBIDOS do Front-End
export class CreateTopicRequestDTO extends createZodDto(CreateTopicRequestSchema) {}
