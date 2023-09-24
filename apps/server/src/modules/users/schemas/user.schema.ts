import { EUserRole, EUserStatus, IUser } from '@libs/shared/domain';
import { z } from 'nestjs-zod/z';

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.nativeEnum(EUserRole),
  status: z.nativeEnum(EUserStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<IUser>;

// Usar como referência de dados ENVIADOS para o Front-End
export const UserResponseDTO = UserSchema.omit({ password: true });
export type UserResponseDTO = z.infer<typeof UserResponseDTO>;
