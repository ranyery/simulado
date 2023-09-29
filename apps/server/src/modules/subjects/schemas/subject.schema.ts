import { ESubjectStatus, ISubject } from '@libs/shared/domain';
import { z } from 'nestjs-zod/z';

export const SubjectSchema = z.object({
  id: z.string().trim().uuid(),
  name: z.string().trim().min(1),
  description: z.string().trim().min(1).optional().nullable(),
  status: z.nativeEnum(ESubjectStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<ISubject>;
