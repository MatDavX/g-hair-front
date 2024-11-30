'use server';

import { api } from '@/lib/fetcher/fetch';
import { revalidateTag } from 'next/cache';

export async function handleSubmit(
  body: {
    funcionario: {
      nome: string;
      data_nascimento: string;
      cpf: string;
      telefone: string;
    };
  },
  token: string
) {
  try {
    const response = await api.post('/funcionarios', {
      body: JSON.stringify(body),
      bearer: token,
    });
    revalidateTag('employee-cache');
    return response;
  } catch (error) {
    console.log({ error });
    return error;
  }
}

export async function handlePatch(
  body: {
    nome: string;
    data_nascimento: string | null;
    cpf: string | null;
    telefone: string;
    ativo: boolean;
  },
  id: string,
  token: string
) {
  try {
    const response = await api.put(`/funcionarios/${id}`, {
      body: JSON.stringify(body),
      bearer: token,
    });
    revalidateTag('employee-cache');
    return response;
  } catch (error) {
    console.log({ error });
    return error;
  }
}
