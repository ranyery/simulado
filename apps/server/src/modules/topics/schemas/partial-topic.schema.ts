import { createZodDto } from 'nestjs-zod';

import { CreateTopicRequestSchema } from './create-topic.schema';

const PartialTopicRequestSchema = CreateTopicRequestSchema.partial();

// Usar como referência de dados RECEBIDOS do Front-End
export class PartialTopicRequestDTO extends createZodDto(PartialTopicRequestSchema) {}
