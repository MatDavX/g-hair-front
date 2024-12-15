import { ENUM_MESSAGE_ZOD } from '@/utils/enum';
import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string({ message: ENUM_MESSAGE_ZOD.MESSAGE_REQUIRED })
    .min(3, { message: ENUM_MESSAGE_ZOD.MESSAGE_REQUIRED }),
  born: z.string().optional().nullable(),
  commission: z.coerce
    .number()
    .min(0, { message: 'O valor total deve ser um número positivo' })
    .default(0),
  cpf: z.string().min(11, { message: 'O CPF deve conter 11 dígitos' }),
  phone: z.string().min(11, { message: 'O telefone deve conter 11 dígitos' }),
});
