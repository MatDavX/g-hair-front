import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const brCellphoneRegex = /^(\+55\s?)?(\(?\d{2}\)?\s?)?(9\d{4}[-\s]?\d{4})$/;
const cpfRegex = /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;

const formSchema = z.object({
  username: z.string({ required_error: 'Este campo é obrigatório.' }).min(2, {
    message: 'O nome deve conter mais que dois caracteres.'
  }),
  cpf: z
    .string({ required_error: 'Este campo é obrigatório.' })
    .regex(cpfRegex, { message: 'CPF informado é inválido.' }),
  email: z.string().default(''),
  born: z.string().default(''),
  phone: z
    .string({ required_error: 'Este campo é obrigatório.' })
    .regex(brCellphoneRegex, { message: 'Numero informado é inválido.' })
});

export type typeSchema = z.infer<typeof formSchema>;
export const resolver = zodResolver(formSchema);
