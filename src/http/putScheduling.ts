import type { formSchema } from '@/app/action-server';
import { api } from '@/lib/ky';
import type { z } from 'zod';
interface PutScheduling {
  rest: z.infer<typeof formSchema>;
  id: string;
}
export async function putScheduling({ id, rest }: PutScheduling) {
  await api.put(`agendamentos/${id}`, {
    json: {
      cliente_id: rest.customer,
      funcionario_id: rest.employer,
      servico_id: rest.service,
      data_hora: rest.calendar,
      descricao: rest.description,
    },
  });
}
