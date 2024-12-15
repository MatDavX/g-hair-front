import { api } from '@/lib/ky';
import type { EmployerRequest } from '@/types/response';

export async function getEmployers() {
  const result = await api
    .get<{ funcionarios: EmployerRequest[] }>('funcionarios', {
      next: {
        tags: ['cache-employer'],
      },
    })
    .json();
  return result.funcionarios;
}
