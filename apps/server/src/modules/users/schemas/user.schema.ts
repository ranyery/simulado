import { EUserRole, EUserStatus, IUser } from '@libs/shared/domain';
import { z } from 'nestjs-zod/z';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.nativeEnum(EUserRole),
  status: z.nativeEnum(EUserStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<IUser>;

// Usar como referência de dados ENVIADO para o Front-End
export const UserResponseSchemaDTO = UserSchema.omit({ password: true });
export type UserResponseSchemaDTO = z.infer<typeof UserResponseSchemaDTO>;
