import type { formSchema } from '@/app/(private)/customers/schema';
import { api } from '@/lib/ky';
import type { z } from 'zod';

export async function postCustomer({
  name,
  phone,
  born,
  email,
}: z.infer<typeof formSchema>) {
  const result = await api
    .post('clientes', {
      json: {
        cliente: {
          nome: name,
          telefone: phone,
          data_nascimento: born || null,
          email: email || null,
          cpf: null,
        },
      },
    })
    .json();
  return result;
}
