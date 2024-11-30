'use server';

import { api } from '@/lib/fetcher/fetch';
import { revalidateTag } from 'next/cache';

export async function handleSubmit(
  body: {
    cliente: {
      nome: string;
      data_nascimento: string | null;
      email: string | null;
      cpf: string | null;
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

export async function handleDelete(id: string, token: string) {
  try {
    const response = await api.put(`/clientes/inativar/${id}`, {
      bearer: token,
    });
    revalidateTag('customers-cache');
    return response;
  } catch (error) {
    console.log({ error });
    return error;
  }
}

export async function handlePatch(
  body: {
    nome: string;
    data_nascimento: string | undefined;
    email: string | undefined;
    cpf: string | undefined;
    telefone: string;
    ativo: boolean;
  },
  id: string,
  token: string
) {
  try {
    const response = await api.put(`/clientes/${id}`, {
      body: JSON.stringify(body),
      bearer: token,
    });
    revalidateTag('customers-cache');
    return response;
  } catch (error) {
    console.error({ error });
    return error;
  }
}
