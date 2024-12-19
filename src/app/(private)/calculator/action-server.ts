'use server';

import { revalidateTag } from 'next/cache';
import { HTTPError } from 'ky';
import { formSchema } from './schema';
import { postCommissions } from '@/http/postCommissions';

export async function postCalculator(
  body: FormData,
  initial_date: string,
  end_date: string
) {
  const result = formSchema.safeParse(Object.fromEntries(body));
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, message: null, errors };
  }
  const { employer } = result.data;

  try {
    const res = await postCommissions({ employer, initial_date, end_date });
    revalidateTag('cache-service');

    return { success: true, message: res, errors: null };
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();
      return { success: false, message, errors: null };
    }
    return { success: false, message: 'Erro inesperado.', errors: null };
  }
}
