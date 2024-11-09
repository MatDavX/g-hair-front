export type CostumersRequest = {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  ultimo_servico: string;
};

export type SchedulingRequest = {
  data_hora: string;
  nome_cliente: string;
  nome_funcionario: string;
  nome_tipo_servico: string;
  valor_tipo_servico: number;
};

export type BrasilApiCEPRequest = {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
};
