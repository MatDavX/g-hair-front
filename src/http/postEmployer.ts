import type { formSchema } from '@/app/(private)/employees/schema';

import { api } from '@/lib/ky';
import type { z } from 'zod';

export async function postEmployer({
  name,
  commission,
  cpf,
  phone,
  born,
}: z.infer<typeof formSchema>) {
  const result = await api
    .post('servicos', {
      json: {
        funcionario: {
          nome: name,
          comissao: commission,
          cpf: cpf,
          telefone: phone,
          nascimento: born,
        },
        endereco: null,
      },
    })
    .json();
  return result;
}
