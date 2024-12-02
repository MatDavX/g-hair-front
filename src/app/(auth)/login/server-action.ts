import { api } from '@/lib/fetch';

type BodyDTO = {
  email: string;
  senha: string;
};

export async function handleSubmit(body: BodyDTO) {
  try {
    console.log(body);
    const response = await api.post('/sessao', body);
    return response;
  } catch (error) {
    console.log({ error });
  }

  return;
}
