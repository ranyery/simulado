import { createZodDto } from 'nestjs-zod';

import { UserSchema } from './user.schema';

const CreateUserRequestSchema = UserSchema.pick({ email: true, password: true });

// Usar como referência de dados RECEBIDOS do Front-End
export class CreateUserRequestDTO extends createZodDto(CreateUserRequestSchema) {}
