import type { ViaCepRequest } from '@/types/response';
import ky from 'ky';

export async function getCEP(cep: string) {
  const result = await ky
    .get<ViaCepRequest>(`https://viacep.com.br/ws/${cep}/json/`, {
      next: {
        tags: ['cache-cep'],
      },
    })
    .json();

  console.log(result);
  return result;
}
