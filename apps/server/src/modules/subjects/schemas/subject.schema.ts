import { ISubject } from '@libs/shared/domain';
import { z } from 'nestjs-zod/z';

export const SubjectSchema = z.object({
  id: z.string().trim().uuid(),
  name: z.string().trim().min(1),
  description: z.string().trim().min(1).optional().nullable(),
}) satisfies z.ZodType<ISubject>;
