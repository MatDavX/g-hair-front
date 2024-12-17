'use server';

import { revalidateTag } from 'next/cache';
import { HTTPError } from 'ky';
import { formSchema } from './schema';
import { putBox } from '@/http/putBox';

export async function editBox(body: FormData, id_box: string) {
  const result = formSchema.safeParse(Object.fromEntries(body));
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, message: null, errors };
  }

  try {
    await putBox({ rest: result.data, id_box });
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();
      return { success: false, message, errors: null };
    }
    return { success: false, message: 'Erro inesperado.', errors: null };
  }
  revalidateTag('cache-box');
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

// export async function createService(body: FormData) {
//   const result = formSchema.safeParse(Object.fromEntries(body));

//   if (!result.success) {
//     const errors = result.error.flatten().fieldErrors;
//     return { success: false, message: null, errors };
//   }

//   const { name, description } = result.data;
//   try {
//     await postService({ name, description });
//     revalidateTag('cache-service');
//   } catch (err) {
//     if (err instanceof HTTPError) {
//       const { message } = await err.response.json();
//       return { success: false, message, errors: null };
//     }
//     return { success: false, message: 'Erro inesperado.', errors: null };
//   }

//   return { success: true, message: null, errors: null };
// }
