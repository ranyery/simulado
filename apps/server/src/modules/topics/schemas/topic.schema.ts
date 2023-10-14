import { ETopicStatus, ITopic } from '@simulado/domain';
import { z } from 'nestjs-zod/z';

export const TopicSchema = z.object({
  id: z.string().trim().cuid(),
  name: z.string().trim(),
  description: z.string().trim().optional().default(''),
  status: z.nativeEnum(ETopicStatus),
  subjectId: z.string().trim().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<ITopic>;

// Usar como referência de dados ENVIADOS para o Front-End
export const TopicResponseDTO = TopicSchema.omit({ createdAt: true, updatedAt: true });
