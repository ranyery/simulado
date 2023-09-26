import { createZodDto } from 'nestjs-zod';

import { QuestionSchema } from './question.schema';

export const CreateQuestionRequestSchema = QuestionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Usar como referência de dados RECEBIDOS do Front-End
export class CreateQuestionRequestDTO extends createZodDto(CreateQuestionRequestSchema) {}
