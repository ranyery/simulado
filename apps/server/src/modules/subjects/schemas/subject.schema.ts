import { ESubjectStatus, ISubject } from '@libs/shared/domain';
import { z } from 'nestjs-zod/z';

export const SubjectSchema = z.object({
  id: z.string().trim().cuid(),
  name: z.string().trim(),
  description: z.string().trim().optional().default(''),
  status: z.nativeEnum(ESubjectStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<ISubject>;

// Usar como referência de dados ENVIADOS para o Front-End
export const SubjectResponseDTO = SubjectSchema.omit({
  createdAt: true,
  updatedAt: true,
});
