'use server';

import { api } from '@/lib/fetcher/fetch';
import type { typeSchema } from './schema';
import { auth } from '@/lib/auth';
import { revalidateTag } from 'next/cache';

export async function handleSubmit(
  body: {
    cliente: {
      nome: string;
      data_nascimento: string | null;
      email: string | null;
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
    revalidateTag('customers-cache');
    return response;
  } catch (error) {
    console.log({ error });
    return error;
  }
}
