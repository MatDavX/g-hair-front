import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  email: z
    .string({ message: 'Este campo é obrigatório' })
    .email({ message: 'Email é invalida.' }),
  senha: z
    .string({ message: 'Este campo é obrigatório' })
    .min(8, { message: 'A senha deve conter no mínimo 8 caracteres' }),
  nome: z.string({ message: 'Este campo é obrigatório' }),
  data_nascimento: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Data invalida' }),
  cpf: z
    .string({ message: 'Este campo é obrigatório' })
    .length(11, { message: 'CPF deve conter 11 dígitos' }),
  telefone: z
    .string({ message: 'Este campo é obrigatório' })
    .min(10, { message: 'Invalid phone number' }),
  razao_social: z.string({ message: 'Este campo é obrigatório' }),
  cnpj: z
    .string({ message: 'Este campo é obrigatório' })
    .length(14, { message: 'CNPJ deve conter 14 dígitos' }),
  rua: z.string({ message: 'Este campo é obrigatório' }),
  numero: z.number({ message: 'Este campo é obrigatório' }),
  complemento: z.string().optional(),
  bairro: z.string({ message: 'Este campo é obrigatório' }),
  cidade: z.string({ message: 'Este campo é obrigatório' }),
  estado: z.string({ message: 'Este campo é obrigatório' }),
  cep: z.string({ message: 'Este campo é obrigatório' }),
  pais: z.string({ message: 'Este campo é obrigatório' }),
});

export type FormValues = z.infer<typeof formSchema>;

export const resolver = zodResolver(formSchema);
