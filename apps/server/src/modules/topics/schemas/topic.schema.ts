import { ITopic } from '@libs/shared/domain';
import { z } from 'nestjs-zod/z';

export const TopicSchema = z.object({
  id: z.string().trim().uuid(),
  name: z.string().trim().min(1),
  description: z.string().trim().min(1).optional().nullable(),
  subjectId: z.string().trim().uuid(),
}) satisfies z.ZodType<ITopic>;
