import { ENUM_MESSAGE_ZOD } from '@/utils/enum';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: ENUM_MESSAGE_ZOD.MESSAGE_REQUIRED }),
  password: z
    .string({ message: ENUM_MESSAGE_ZOD.MESSAGE_REQUIRED })
    .min(8, { message: 'Senha deve conter mais que 8 caracteres.' }),
});

export type FormTypeSchemaLogin = z.infer<typeof formSchema>;
export const resolverLogin = zodResolver(formSchema);
