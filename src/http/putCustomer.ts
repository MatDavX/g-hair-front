import type { formSchema } from '@/app/(private)/customers/schema';
import { api } from '@/lib/ky';
import type { z } from 'zod';
interface editCustomer {
  rest: z.infer<typeof formSchema>;
  id_customer: string;
}
export async function putCustomer({ rest, id_customer }: editCustomer) {
  const result = await api
    .put(`clientes/${id_customer}`, {
      json: {
        cliente: {
          nome: rest.name,
          telefone: rest.phone,
          data_nascimento: rest.born || null,
          email: rest.email || null,
          cpf: null,
        },
      },
    })
    .json();
  return result;
}
