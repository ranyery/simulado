import {
  EQuestionDifficultyLevel,
  EQuestionStatus,
  EQuestionType,
  IQuestion,
} from '@libs/shared/domain';
import { z } from 'nestjs-zod/z';

const QuestionSchema = z.object({
  id: z.string(),
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
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<IQuestion>;

// Usar como referência de dados ENVIADOS para o Front-End
export type QuestionResponseDTO = z.infer<typeof QuestionSchema>;
