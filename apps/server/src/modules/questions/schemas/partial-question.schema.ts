import { createZodDto } from 'nestjs-zod';

import { CreateQuestionRequestSchema } from './create-question.schema';

const PartialQuestionRequestSchema = CreateQuestionRequestSchema.partial();

// Usar como referência de dados RECEBIDOS do Front-End
export class PartialQuestionRequestDTO extends createZodDto(PartialQuestionRequestSchema) {}
