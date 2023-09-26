import {
  EQuestionDifficultyLevel,
  EQuestionStatus,
  EQuestionType,
  IQuestion,
} from '@libs/shared/domain';
import { z } from 'nestjs-zod/z';

export const QuestionSchema = z.object({
  id: z.string().trim().uuid(),
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
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<IQuestion>;
