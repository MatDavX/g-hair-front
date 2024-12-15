import { api } from '@/lib/ky';
import type { z } from 'zod';
import type { formSchema } from '@/app/(private)/services/schema';
export async function postService({
  name,
  description,
}: z.infer<typeof formSchema>) {
  const result = await api
    .post('servicos', {
      json: {
        nome: name,
        descricao: description || null,
      },
    })
    .json();
  return result;
}
