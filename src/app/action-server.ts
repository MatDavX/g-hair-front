'user server';

import { ENUM_MESSAGE_ZOD } from '@/utils/enum';

import { z } from 'zod';

export const formSchema = z.object({
  customer: z.string({ message: ENUM_MESSAGE_ZOD.MESSAGE_REQUIRED }),
  employer: z.string({ message: ENUM_MESSAGE_ZOD.MESSAGE_REQUIRED }),
  service: z.string({ message: ENUM_MESSAGE_ZOD.MESSAGE_REQUIRED }),
  calendar: z.string({ message: ENUM_MESSAGE_ZOD.MESSAGE_REQUIRED }),
  description: z.string().optional().nullable(),
});
