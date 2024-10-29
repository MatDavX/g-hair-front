'use server';

import { z } from 'zod';

const FormSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(8),
  nome: z.string(),
  data_nascimento: z.string(),
  cpf: z.string().length(11),
  telefone: z.string(),
  razao_social: z.string(),
  cnpj: z.string().length(14),
  rua: z.string(),
  numero: z.number(),
  complemento: z.string().optional(),
  bairro: z.string(),
  cidade: z.string(),
  estado: z.string().length(2),
  cep: z.string().length(8),
  pais: z.string(),
});

export async function submitForm(formData: FormData) {
  //   const validatedFields = FormSchema.safeParse({
  //     email: formData.get('email'),
  //     senha: formData.get('senha'),
  //     nome: formData.get('nome'),
  //     data_nascimento: formData.get('data_nascimento'),
  //     cpf: formData.get('cpf'),
  //     telefone: formData.get('telefone'),
  //     razao_social: formData.get('razao_social'),
  //     cnpj: formData.get('cnpj'),
  //     rua: formData.get('rua'),
  //     numero: Number(formData.get('numero')),
  //     complemento: formData.get('complemento'),
  //     bairro: formData.get('bairro'),
  //     cidade: formData.get('cidade'),
  //     estado: formData.get('estado'),
  //     cep: formData.get('cep'),
  //     pais: formData.get('pais'),
  //   });

  //   if (!validatedFields.success) {
  //     return { error: 'Invalid fields. Please check your input.' };
  //   }
  console.log(formData);
  //   console.log(validatedFields.data);

  return { success: 'Form submitted successfully!' };
}
