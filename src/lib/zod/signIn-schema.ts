import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório')
    .email('Email inválido'),
  password: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório')
    .min(8, 'Senha deve ter no mínimo 8 caracteres'),
});
