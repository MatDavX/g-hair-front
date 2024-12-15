import { z } from 'zod';

export const formSchema = z.object({
  customer: z.string(),
  employer: z.string(),
  service: z.string(),
  calendar: z.string(),
  description: z.string().optional().nullable(),
});

export const formSchemaFinish = z.object({
  method_payment_id: z.string(),
  total: z.coerce
    .number()
    .min(0, { message: 'O valor total deve ser um número positivo' })
    .default(0),
  discount_value: z.coerce
    .number()
    .min(0, { message: 'O valor total deve ser um número positivo' })
    .default(0),
  added_value: z.coerce
    .number()
    .min(0, { message: 'O valor total deve ser um número positivo' })
    .default(0),
});
