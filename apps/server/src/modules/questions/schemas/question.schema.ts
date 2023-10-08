import {
  EQuestionDifficultyLevel,
  EQuestionStatus,
  EQuestionType,
  IQuestion,
} from '@libs/shared/domain';
import { z } from 'nestjs-zod/z';

export const QuestionSchema = z.object({
  id: z.string().trim().uuid(),
  statement: z.string().trim(),
  answerOptions: z
    .object({
      text: z.string().trim(),
      isCorrect: z.boolean(),
    })
    .array()
    .min(2)
    .max(5),
  explanation: z.string().trim().optional().default(''),
  type: z.nativeEnum(EQuestionType),
  source: z.object({
    exam: z.object({
      id: z.string().trim().uuid(),
      acronym: z.string().trim(),
    }),
    year: z.number().gte(0).optional().default(0),
  }),
  difficultyLevel: z.nativeEnum(EQuestionDifficultyLevel),
  subjectId: z.string().trim().uuid(),
  relatedTopicIds: z.string().trim().uuid().array().min(1),
  status: z.nativeEnum(EQuestionStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<IQuestion>;
