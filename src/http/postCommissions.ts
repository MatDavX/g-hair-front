import type { formSchema } from '@/app/(private)/calculator/schema';

import { api } from '@/lib/ky';
import type { CalculatorRequest } from '@/types/response';
import type { z } from 'zod';

export async function postCommissions({
  employer,
  initial_date,
  end_date,
}: z.infer<typeof formSchema> & { initial_date: string; end_date: string }) {
  const result = await api
    .post('folhas/calcular', {
      json: {
        funcionario_id: employer,
        periodo_inicio: initial_date,
        periodo_fim: end_date,
      },
    })
    .json();
  return result as CalculatorRequest;
}
