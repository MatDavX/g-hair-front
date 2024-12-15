import type { formSchemaFinish } from '@/app/(private)/scheduling/schema';
import { api } from '@/lib/ky';
import type { z } from 'zod';

interface FinishScheduling {
  rest: z.infer<typeof formSchemaFinish>;
  id_scheduling: string;
}

export async function postFinishScheduling({
  rest,
  id_scheduling,
}: FinishScheduling) {
  await api.post('caixas', {
    json: {
      metodo_de_pagamento_id: rest.method_payment_id,
      agendamento_id: id_scheduling,
      valor_total: rest.total,
      valor_desconto: rest.discount_value,
      valor_acrescimo: rest.added_value,
    },
  });
}
