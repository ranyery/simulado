import { ISubject } from '@libs/shared/domain';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const PartialSubjectRequestSchema = z.object({
  text: z.string(),
  description: z.string().optional().nullable(),
}) satisfies z.ZodType<Pick<ISubject, 'text' | 'description'>>;

// Usar como referência de dados RECEBIDOS do Front-End
export class PartialSubjectRequestDTO extends createZodDto(PartialSubjectRequestSchema) {}
