import { createZodDto } from 'nestjs-zod';
import { InstituteSchema } from './institute.schema';

export const CreateInstituteRequestSchema = InstituteSchema.pick({
  acronym: true,
  name: true,
  status: true,
});

// Usar como referência de dados RECEBIDOS do Front-End
export class CreateInstituteRequestDTO extends createZodDto(CreateInstituteRequestSchema) {}
