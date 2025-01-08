import { ENUM_MESSAGE_ZOD } from '@/utils/enum';
import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string({ message: ENUM_MESSAGE_ZOD.MESSAGE_REQUIRED })
    .min(3, { message: ENUM_MESSAGE_ZOD.MESSAGE_REQUIRED }),
  born: z.string().optional().nullable(),
  cpf: z.string().min(11, { message: 'O CPF deve conter 11 dígitos' }),
  phone: z.string().min(11, { message: 'O telefone deve conter 11 dígitos' }),
  cep: z.string().min(8, { message: 'O CEP deve conter 8 dígitos' }),
  neighborhood: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  number: z.string().default('0'),
  complement: z.string().optional().nullable(),
  street: z.string().optional().nullable(),
});
