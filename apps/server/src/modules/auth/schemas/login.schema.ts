import { createZodDto } from 'nestjs-zod';

import { UserSchema } from '../../users/schemas/user.schema';

const LoginRequestSchema = UserSchema.pick({ email: true, password: true });

// Usar como referência de dados RECEBIDOS do Front-End
export class LoginRequestDTO extends createZodDto(LoginRequestSchema) {}
