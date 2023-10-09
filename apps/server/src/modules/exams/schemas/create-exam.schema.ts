import { createZodDto } from 'nestjs-zod';

import { ExamSchema } from './exam.schema';

export const CreateExamRequestSchema = ExamSchema.pick({ acronym: true, name: true, status: true });

// Usar como referência de dados RECEBIDOS do Front-End
export class CreateExamRequestDTO extends createZodDto(CreateExamRequestSchema) {}

// Usar como referência de dados ENVIADOS para o Front-End
export const CreateExamResponseDTO = ExamSchema.omit({ updatedAt: true });
