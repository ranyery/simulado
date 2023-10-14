import { ESubjectStatus, ISubject } from '@simulado/domain';
import { z } from 'nestjs-zod/z';
import { QuestionSchema } from '../../questions/schemas/question.schema';
import { TopicSchema } from '../../topics/schemas/topic.schema';

export const SubjectSchema = z.object({
  id: z.string().trim().cuid(),
  name: z.string().trim(),
  description: z.string().trim().optional().default(''),
  status: z.nativeEnum(ESubjectStatus),
  topics: z.array(TopicSchema),
  questions: z.array(QuestionSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<ISubject>;

// Usar como referência de dados ENVIADOS para o Front-End
export const SubjectResponseDTO = SubjectSchema.omit({
  createdAt: true,
  updatedAt: true,
});
