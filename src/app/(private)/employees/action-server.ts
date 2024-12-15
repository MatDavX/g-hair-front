'use server';

import { revalidateTag } from 'next/cache';
import { HTTPError } from 'ky';
import { formSchema } from './schema';
import { putService } from '@/http/putService';
import { postEmployer } from '@/http/postEmployer';

export async function editCustomer(body: FormData, id_service: string) {
  const result = formSchema.safeParse(Object.fromEntries(body));
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, message: null, errors };
  }

  try {
    await putService({ rest: result.data, id_service });
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();
      return { success: false, message, errors: null };
    }
    return { success: false, message: 'Erro inesperado.', errors: null };
  }
  revalidateTag('cache-service');
  return { success: true, message: null, errors: null };
}

// export async function removeScheduling(id: string) {
//   try {
//     await deleteScheduling({ id });
//   } catch (err) {
//     if (err instanceof HTTPError) {
//       const { message } = await err.response.json();
//       return { success: false, message, errors: null };
//     }
//     return { success: false, message: 'Erro inesperado.', errors: null };
//   }
//   revalidateTag('cache-scheduling');
//   return { success: true, message: null, errors: null };
// }

export async function createEmployer(body: FormData) {
  const result = formSchema.safeParse(Object.fromEntries(body));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, message: null, errors };
  }

  const { name, commission, cpf, phone, born } = result.data;
  try {
    await postEmployer({ name, commission, cpf, phone, born });
    revalidateTag('cache-employer');
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();
      return { success: false, message, errors: null };
    }
    return { success: false, message: 'Erro inesperado.', errors: null };
  }

  return { success: true, message: null, errors: null };
}
