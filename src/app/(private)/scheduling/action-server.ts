'use server';

import { revalidateTag } from 'next/cache';
import { HTTPError } from 'ky';
import { formSchema, formSchemaFinish } from './schema';
import { api } from '@/lib/ky';
import { putScheduling } from '@/http/putScheduling';
import { deleteScheduling } from '@/http/deleteScheduling';
import { postFinishScheduling } from '@/http/postFinishScheduling';

export async function finishScheduling(body: FormData, id: string) {
  const result = formSchemaFinish.safeParse(Object.fromEntries(body));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, message: null, errors };
  }

  try {
    await postFinishScheduling({ id_scheduling: id, rest: result.data });
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();
      return { success: false, message, errors: null };
    }
    return { success: false, message: 'Erro inesperado.', errors: null };
  }
  revalidateTag('cache-scheduling');
  return { success: true, message: null, errors: null };
}

export async function editScheduling(body: FormData, id: string) {
  const result = formSchema.safeParse(Object.fromEntries(body));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, message: null, errors };
  }

  try {
    await putScheduling({ id, rest: result.data });
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();
      return { success: false, message, errors: null };
    }
    return { success: false, message: 'Erro inesperado.', errors: null };
  }
  revalidateTag('cache-scheduling');
  return { success: true, message: null, errors: null };
}

export async function removeScheduling(id: string) {
  try {
    await deleteScheduling({ id });
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();
      return { success: false, message, errors: null };
    }
    return { success: false, message: 'Erro inesperado.', errors: null };
  }
  revalidateTag('cache-scheduling');
  return { success: true, message: null, errors: null };
}

export async function createScheduling(body: FormData) {
  const result = formSchema.safeParse(Object.fromEntries(body));

  if (!result.success) {
    console.log('a');
    const errors = result.error.flatten().fieldErrors;
    return { success: false, message: null, errors };
  }

  const { calendar, customer, employer, service, description } = result.data;
  try {
    await api.post('agendamentos', {
      json: {
        cliente_id: customer,
        funcionario_id: employer,
        servico_id: service,
        data_hora: calendar,
        descricao: description,
      },
    });
    revalidateTag('cache-scheduling');
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();
      return { success: false, message, errors: null };
    }
    return { success: false, message: 'Erro inesperado.', errors: null };
  }

  return { success: true, message: null, errors: null };
}
