import { ESubjectStatus, ISubject } from '@libs/shared/domain';
import { z } from 'nestjs-zod/z';
import { TopicSchema } from '../../topics/schemas/topic.schema';

export const SubjectSchema = z.object({
  id: z.string().trim().uuid(),
  name: z.string().trim(),
  description: z.string().trim().optional().nullable(),
  topics: z.array(TopicSchema),
  status: z.nativeEnum(ESubjectStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<ISubject>;

const cleanTopicsDTO = z.array(TopicSchema.pick({ id: true, name: true }));

// Usar como referência de dados ENVIADOS para o Front-End
export const SubjectResponseDTO = SubjectSchema.omit({
  createdAt: true,
  updatedAt: true,
}).extend({ topics: cleanTopicsDTO });
