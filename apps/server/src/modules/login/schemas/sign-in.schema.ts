import { createZodDto } from 'nestjs-zod';

import { UserSchema } from '../../users/schemas/user.schema';

const SignInRequestSchema = UserSchema.pick({ email: true, password: true });

// Usar como referência de dados RECEBIDOS do Front-End
export class SignInRequestDTO extends createZodDto(SignInRequestSchema) {}
