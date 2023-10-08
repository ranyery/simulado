import { createZodDto } from 'nestjs-zod';

import { UserSchema } from './user.schema';

const CreateUserRequestSchema = UserSchema.pick({ email: true, password: true });

// Usar como referência de dados RECEBIDOS do Front-End
export class CreateUserRequestDTO extends createZodDto(CreateUserRequestSchema) {}

// Usar como referência de dados ENVIADOS para o Front-End
export const CreateUserResponseDTO = UserSchema.omit({
  password: true,
  roles: true,
  permissions: true,
  createdAt: true,
  updatedAt: true,
});
