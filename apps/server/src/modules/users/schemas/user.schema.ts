import { EUserRole, EUserStatus, IUser } from '@libs/shared/domain';
import { z } from 'nestjs-zod/z';

export const UserSchema = z.object({
  id: z.string().trim().uuid(),
  email: z.string({ required_error: 'Email is required' }).trim().email(),
  password: z.string({ required_error: 'Password is required' }).trim().min(3),
  role: z.nativeEnum(EUserRole),
  permissions: z
    .object({
      entity: z.string(),
      read: z.boolean(),
      create: z.boolean(),
      update: z.boolean(),
      delete: z.boolean(),
    })
    .array(),
  status: z.nativeEnum(EUserStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<IUser>;

// Usar como referência de dados ENVIADOS para o Front-End
export const UserResponseDTO = UserSchema.omit({ password: true });
