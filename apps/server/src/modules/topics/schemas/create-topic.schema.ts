import { ITopic } from '@libs/shared/domain';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateTopicRequestSchema = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  subjectId: z.string(),
}) satisfies z.ZodType<Pick<ITopic, 'name' | 'description' | 'subjectId'>>;

// Usar como referência de dados RECEBIDOS do Front-End
export class CreateTopicRequestDTO extends createZodDto(CreateTopicRequestSchema) {}
