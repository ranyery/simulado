import { ITopic } from '@libs/shared/domain';
import { z } from 'nestjs-zod/z';

const TopicSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  subjectId: z.string(),
}) satisfies z.ZodType<ITopic>;

// Usar como referência de dados ENVIADOS para o Front-End
export type TopicResponseDTO = z.infer<typeof TopicSchema>;
