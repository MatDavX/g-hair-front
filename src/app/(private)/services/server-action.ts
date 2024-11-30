'use server';

import { api } from '@/lib/fetcher/fetch';
import { revalidateTag } from 'next/cache';

export async function handleSubmit(
  body: {
    nome: string;
    valor: number;
    descricao: string | undefined;
  },
  token: string
) {
  try {
    const response = await api.post('/servicos', {
      body: JSON.stringify(body),
      bearer: token,
    });
    revalidateTag('services-cache');
    return response;
  } catch (error) {
    console.log({ error });
    return error;
  }
}

export async function handlePatch(
  body: {
    nome: string;
    valor: number;
    descricao: string | undefined;
  },
  id: string,
  token: string
) {
  try {
    const response = await api.put(`servicos/${id}`, {
      body: JSON.stringify(body),
      bearer: token,
    });
    revalidateTag('services-cache');
    return response;
  } catch (error) {
    console.log({ error });
    return error;
  }
}
