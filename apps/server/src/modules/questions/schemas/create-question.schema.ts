import {
  EQuestionDifficultyLevel,
  EQuestionStatus,
  EQuestionType,
  IQuestion,
} from '@libs/shared/domain';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateQuestionRequestSchema = z.object({
  statement: z.string(),
  answerOptions: z
    .object({
      text: z.string(),
      isCorrect: z.boolean(),
    })
    .array(),
  explanation: z.string().optional().nullable(),
  type: z.nativeEnum(EQuestionType),
  source: z.object({
    institution: z.object({
      id: z.string(),
      name: z.string(),
    }),
    year: z.number(),
  }),
  difficultyLevel: z.nativeEnum(EQuestionDifficultyLevel),
  subjectId: z.string(),
  relatedTopicIds: z.string().array(),
  status: z.nativeEnum(EQuestionStatus),
}) satisfies z.ZodType<Omit<IQuestion, 'id' | 'createdAt' | 'updatedAt'>>;

// Usar como referência de dados RECEBIDOS do Front-End
export class CreateQuestionRequestDTO extends createZodDto(CreateQuestionRequestSchema) {}
