import { ETopicStatus, ITopic } from '@libs/shared/domain';
import { z } from 'nestjs-zod/z';

export const TopicSchema = z.object({
  id: z.string().trim().uuid(),
  name: z.string().trim().min(1),
  description: z.string().trim().min(1).optional().nullable(),
  status: z.nativeEnum(ETopicStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
  subjectId: z.string().trim().uuid(),
}) satisfies z.ZodType<ITopic>;

// Usar como referência de dados ENVIADOS para o Front-End
export const TopicResponseDTO = TopicSchema.omit({ createdAt: true, updatedAt: true });
