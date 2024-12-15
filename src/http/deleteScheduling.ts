import { api } from '@/lib/ky';
interface DeleteScheduling {
  id: string;
}
export async function deleteScheduling({ id }: DeleteScheduling) {
  const result = await api.delete(`agendamentos/${id}`).json();
  return result;
}
