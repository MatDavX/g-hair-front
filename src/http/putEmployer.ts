import type { formSchema } from '@/app/(private)/employees/schema';

import { api } from '@/lib/ky';
import type { z } from 'zod';

export async function postEmployer(
  {
    name,
    cpf,
    cep,
    number,
    city,
    state,
    street,
    neighborhood,
    complement,
    phone,
    born,
  }: z.infer<typeof formSchema>,
  id: number
) {
  const result = await api
    .put(`funcionarios/${id}`, {
      json: {
        funcionario: {
          nome: name,
          data_nascimento: born,
          cpf: cpf,
          telefone: phone,
        },
        endereco: {
          rua: street,
          numero: Number(number),
          complemento: complement,
          bairro: neighborhood,
          cidade: city,
          estado: state,
          cep: cep,
          pais: 'brasil',
        },
      },
    })
    .json();
  return result;
}
