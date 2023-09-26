import {
  EQuestionDifficultyLevel,
  EQuestionStatus,
  EQuestionType,
  IQuestion,
} from '@libs/shared/domain';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const PartialQuestionRequestSchema = z.object({
  statement: z.string().optional(),
  answerOptions: z
    .object({
      text: z.string(),
      isCorrect: z.boolean(),
    })
    .array()
    .optional(),
  explanation: z.string().optional().nullable(),
  type: z.nativeEnum(EQuestionType).optional(),
  source: z
    .object({
      institution: z.object({
        id: z.string(),
        name: z.string(),
      }),
      year: z.number(),
    })
    .optional(),
  difficultyLevel: z.nativeEnum(EQuestionDifficultyLevel).optional(),
  subjectId: z.string().optional(),
  relatedTopicIds: z.string().array().optional(),
  status: z.nativeEnum(EQuestionStatus).optional(),
}) satisfies z.ZodType<Partial<Omit<IQuestion, 'id' | 'createdAt' | 'updatedAt'>>>;

// Usar como referência de dados RECEBIDOS do Front-End
export class PartialQuestionRequestDTO extends createZodDto(PartialQuestionRequestSchema) {}
