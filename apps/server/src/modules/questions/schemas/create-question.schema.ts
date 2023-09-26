import {
  EQuestionDifficultyLevel,
  EQuestionStatus,
  EQuestionType,
  IQuestion,
} from '@libs/shared/domain';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateQuestionRequestSchema = z.object({
  statement: z.string().trim().min(1),
  answerOptions: z
    .object({
      text: z.string().trim().min(1),
      isCorrect: z.boolean(),
    })
    .array()
    .min(2)
    .max(5),
  explanation: z.string().trim().min(1).optional().nullable(),
  type: z.nativeEnum(EQuestionType),
  source: z.object({
    institution: z.object({
      id: z.string().trim().uuid(),
      name: z.string().trim().min(1),
    }),
    year: z.number().positive(),
  }),
  difficultyLevel: z.nativeEnum(EQuestionDifficultyLevel),
  subjectId: z.string().trim().uuid(),
  relatedTopicIds: z.string().trim().uuid().array().min(1),
  status: z.nativeEnum(EQuestionStatus),
}) satisfies z.ZodType<Omit<IQuestion, 'id' | 'createdAt' | 'updatedAt'>>;

// Usar como referência de dados RECEBIDOS do Front-End
export class CreateQuestionRequestDTO extends createZodDto(CreateQuestionRequestSchema) {}
