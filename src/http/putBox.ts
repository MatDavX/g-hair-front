import type { formSchema } from '@/app/(private)/finance/schema';
import { api } from '@/lib/ky';
import type { z } from 'zod';
interface editBox {
  rest: z.infer<typeof formSchema>;
  id_box: string;
}

export async function putBox({ rest, id_box }: editBox) {
  const result = await api
    .put(`clientes/${id_box}`, {
      json: {
        metodo_de_pagamento_id: rest.method_payment_id,
        valor_total: rest.total,
        valor_desconto: rest.discount_value,
        valor_acrescimo: 0,
      },
    })
    .json();
  return result;
}
