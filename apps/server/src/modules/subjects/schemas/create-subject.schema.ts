import { createZodDto } from 'nestjs-zod';

import { SubjectSchema } from './subject.schema';

export const CreateSubjectRequestSchema = SubjectSchema.omit({ id: true });

// Usar como referência de dados RECEBIDOS do Front-End
export class CreateSubjectRequestDTO extends createZodDto(CreateSubjectRequestSchema) {}
