import { api } from '@/lib/ky';
import type { SelectRequest } from '@/types/response';

export async function getMethodsPayment() {
  const result = await api
    .get<{ metodosDePagamentos: SelectRequest[] }>('metodos-de-pagamentos')
    .json();
  return result.metodosDePagamentos;
}
