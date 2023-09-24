import { IUser } from '@libs/shared/domain';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const SignInRequestSchema = z.object({
  email: z.string().email(),
  password: z.string({ required_error: 'Password is required' }),
}) satisfies z.ZodType<Pick<IUser, 'email' | 'password'>>;

// Usar como referência de dados RECEBIDOS do Front-End
export class SignInRequestDTO extends createZodDto(SignInRequestSchema) {}
