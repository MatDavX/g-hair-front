import type { formSchema } from '@/app/(private)/services/schema';
import { api } from '@/lib/ky';
import type { z } from 'zod';
interface editService {
  rest: z.infer<typeof formSchema>;
  id_service: string;
}
export async function putService({ rest, id_service }: editService) {
  const result = await api
    .put(`servicos/${id_service}`, {
      json: {
        nome: rest.name,
        descricao: rest.description || null,
      },
    })
    .json();
  return result;
}
