import { ITopic } from '@libs/shared/domain';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const PartialTopicRequestSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  subjectId: z.string().optional(),
}) satisfies z.ZodType<Partial<ITopic>>;

// Usar como referência de dados RECEBIDOS do Front-End
export class PartialTopicRequestDTO extends createZodDto(PartialTopicRequestSchema) {}
