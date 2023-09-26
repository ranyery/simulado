import { ISubject } from '@libs/shared/domain';
import { z } from 'nestjs-zod/z';

const SubjectSchema = z.object({
  id: z.string(),
  text: z.string(),
  description: z.string().optional().nullable(),
}) satisfies z.ZodType<ISubject>;

// Usar como referência de dados ENVIADOS para o Front-End
export type SubjectResponseDTO = z.infer<typeof SubjectSchema>;
