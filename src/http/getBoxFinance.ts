import { api } from '@/lib/ky';
import type { BoxFinanceRequest } from '@/types/response';

export async function getBoxFinance() {
  const result = await api
    .get<BoxFinanceRequest[]>('caixas', {
      next: {
        tags: ['cache-box'],
      },
    })
    .json();
  return result;
}
