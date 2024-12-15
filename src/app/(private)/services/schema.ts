import { ENUM_MESSAGE_ZOD } from '@/utils/enum';
import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string({ message: ENUM_MESSAGE_ZOD.MESSAGE_REQUIRED })
    .min(3, { message: ENUM_MESSAGE_ZOD.MESSAGE_REQUIRED }),
  description: z.string().optional().nullable(),
});
