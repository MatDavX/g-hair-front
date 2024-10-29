export type CostumersRequest = {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  ultimo_servico: string;
};

export type BrasilApiCEPRequest = {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
};
