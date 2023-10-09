import { createZodDto } from 'nestjs-zod';

import { CreateExamRequestSchema } from './create-exam.schema';

const PartialExamRequestSchema = CreateExamRequestSchema.partial();

// Usar como referência de dados RECEBIDOS do Front-End
export class PartialExamRequestDTO extends createZodDto(PartialExamRequestSchema) {}
