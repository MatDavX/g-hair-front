'use server';

import { api } from '@/lib/fetcher/fetch';
import type { typeSchema } from './schema';
import { auth } from '@/lib/auth';

export async function handleSubmit(
  body: {
    cliente: {
      nome: string;
      data_nascimento: string;
      email: string;
      cpf: string;
      telefone: string;
    };
  },
  token: string
) {
  try {
    const response = await api.post('/clientes', {
      body: JSON.stringify(body),
      bearer: token,
    });
    return response;
  } catch (error) {
    return error;
  }
}
