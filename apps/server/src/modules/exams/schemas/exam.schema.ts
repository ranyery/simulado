import { EExamStatus, IExam } from '@libs/shared/domain';
import { z } from 'nestjs-zod/z';

export const ExamSchema = z.object({
  id: z.string().trim().cuid(),
  acronym: z.string().trim(),
  name: z.string().trim().optional().default(''),
  status: z.nativeEnum(EExamStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<IExam>;

// Usar como referência de dados ENVIADOS para o Front-End
export const ExamResponseDTO = ExamSchema.omit({ updatedAt: true });
