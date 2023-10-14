import { EInstituteStatus, IInstitute } from '@simulado/domain';
import { z } from 'nestjs-zod/z';
import { QuestionSchema } from '../../questions/schemas/question.schema';

export const InstituteSchema = z.object({
  id: z.string().trim().cuid(),
  acronym: z.string().trim(),
  name: z.string().trim().optional().default(''),
  status: z.nativeEnum(EInstituteStatus),
  questions: z.array(QuestionSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<IInstitute>;

// Usar como referência de dados ENVIADOS para o Front-End
export const InstituteResponseDTO = InstituteSchema.omit({ updatedAt: true });
