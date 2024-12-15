import { ENUM_MESSAGE_ZOD } from '@/utils/enum';
import { z } from 'zod';

export const formSchema = z.object({
  email: z
    .string({ message: ENUM_MESSAGE_ZOD.MESSAGE_REQUIRED })
    .email({ message: 'Favor informar um email válido.' }),
  senha: z
    .string({ message: ENUM_MESSAGE_ZOD.MESSAGE_REQUIRED })
    .min(8, { message: 'Senha deve conter mais que 8 caracteres.' }),
});
