'use server';

import { revalidateTag } from 'next/cache';
import { HTTPError } from 'ky';
import { formSchema } from './schema';
import { postCustomer } from '@/http/postCustomer';
import { putCustomer } from '@/http/putCustomer';

export async function editCustomer(body: FormData, id_customer: string) {
  const result = formSchema.safeParse(Object.fromEntries(body));
  console.log(id_customer);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, message: null, errors };
  }

  try {
    await putCustomer({ rest: result.data, id_customer });
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();
      return { success: false, message, errors: null };
    }
    return { success: false, message: 'Erro inesperado.', errors: null };
  }
  revalidateTag('cache-customers');
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

export async function createCustomer(body: FormData) {
  const result = formSchema.safeParse(Object.fromEntries(body));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, message: null, errors };
  }

  const { name, phone, born, email } = result.data;
  try {
    await postCustomer({ name, phone, born, email });
    revalidateTag('cache-customers');
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();
      return { success: false, message, errors: null };
    }
    return { success: false, message: 'Erro inesperado.', errors: null };
  }

  return { success: true, message: null, errors: null };
}
