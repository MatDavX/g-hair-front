'use server';

import { formSchema } from './schema';
import { HTTPError } from 'ky';
import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';

export async function signinWithEmailAndPassword(body: FormData) {
  const result = formSchema.safeParse(Object.fromEntries(body));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, message: null, errors };
  }

  const { email, senha } = result.data;

  try {
    await signIn('credentials', {
      email,
      senha,
      redirect: false,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case 'CredentialsSignin':
          return {
            success: false,
            message: 'Credenciais invalidas',
            errors: null,
          };
        default:
          return {
            success: false,
            message: 'Credenciais invalidas',
            errors: null,
          };
      }
    }
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();
      return { success: false, message, errors: null };
    }
    console.error(err);
    return {
      success: false,
      message: 'Erro inesperado, tente novamente mais tarde.',
      errors: null,
    };
  }

  return { success: true, message: null, errors: null };
}
