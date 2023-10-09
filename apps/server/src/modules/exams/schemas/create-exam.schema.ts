import { createZodDto } from 'nestjs-zod';

import { ExamSchema } from './exam.schema';

export const CreateExamRequestSchema = ExamSchema.pick({ acronym: true, name: true, status: true });

// Usar como referência de dados RECEBIDOS do Front-End
export class CreateExamRequestDTO extends createZodDto(CreateExamRequestSchema) {}
