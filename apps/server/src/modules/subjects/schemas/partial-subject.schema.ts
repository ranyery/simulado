import { createZodDto } from 'nestjs-zod';

import { CreateSubjectRequestSchema } from './create-subject.schema';

const PartialSubjectRequestSchema = CreateSubjectRequestSchema.partial();

// Usar como referência de dados RECEBIDOS do Front-End
export class PartialSubjectRequestDTO extends createZodDto(PartialSubjectRequestSchema) {}
