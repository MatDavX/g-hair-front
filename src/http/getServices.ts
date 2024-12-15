import { api } from '@/lib/ky';
import type { ServicesRequest } from '@/types/response';

export async function getServices() {
  const result = await api
    .get<{ servicos: ServicesRequest[] }>('servicos', {
      next: {
        tags: ['cache-service'],
      },
    })
    .json();
  return result.servicos;
}
