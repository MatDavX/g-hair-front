import { ENUM_MESSAGE_ZOD } from '@/utils/enum';
import { z } from 'zod';

export const formSchema = z.object({
  employer: z.string({ message: ENUM_MESSAGE_ZOD.MESSAGE_REQUIRED }),
});
