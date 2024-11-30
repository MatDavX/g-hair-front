import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  username: z.string({ required_error: 'Este campo é obrigatório.' }).min(2, {
    message: 'O nome deve conter mais que dois caracteres.',
  }),
  value: z.string({ required_error: 'Este campo é obrigatório.' }),
  description: z.string().optional(),
});

export type typeSchema = z.infer<typeof formSchema>;
export const resolver = zodResolver(formSchema);
