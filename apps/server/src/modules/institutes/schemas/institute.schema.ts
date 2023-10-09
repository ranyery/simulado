import { EInstituteStatus, IInstitute } from '@libs/shared/domain';
import { z } from 'nestjs-zod/z';

export const InstituteSchema = z.object({
  id: z.string().trim().cuid(),
  acronym: z.string().trim(),
  name: z.string().trim().optional().default(''),
  status: z.nativeEnum(EInstituteStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<IInstitute>;

// Usar como referência de dados ENVIADOS para o Front-End
export const InstituteResponseDTO = InstituteSchema.omit({ updatedAt: true });
