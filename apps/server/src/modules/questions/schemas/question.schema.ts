import {
  EQuestionDifficultyLevel,
  EQuestionStatus,
  EQuestionType,
  IQuestion,
} from '@libs/shared/domain';
import { z } from 'nestjs-zod/z';

export const QuestionSchema = z.object({
  id: z.string().trim().cuid(),
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
  examId: z.string().trim().cuid(),
  year: z.number().gte(0).optional().default(0),
  difficultyLevel: z.nativeEnum(EQuestionDifficultyLevel),
  subjectId: z.string().trim().cuid(),
  relatedTopicIds: z.string().trim().cuid().array().min(1),
  status: z.nativeEnum(EQuestionStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<IQuestion>;
