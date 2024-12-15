import { api } from '@/lib/ky';
import type { CustomerRequest } from '@/types/response';

export async function getCustomers() {
  const result = await api
    .get<CustomerRequest[]>('clientes', {
      next: {
        tags: ['cache-customers'],
      },
    })
    .json();
  return result;
}
