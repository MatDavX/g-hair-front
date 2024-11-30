export type CostumersRequest = {
  id: string;
  nome: string;
  telefone: string;
  data_nascimento: Date;
  cpf: string;
  email: string;
  ultimo_servico: string;
};

export type EmployeeRequest = {
  id: string;
  nome: string;
  data_nascimento: string;
  cpf: string;
  telefone: string;
  empresa_id: string;
  endereco_id: string;
  ativo: boolean;
  comissao: string;
  created_at: string;
  updated_at: string;
};

export type EmployeesRequest = {
  funcionarios: EmployeeRequest[];
};

export type ServiceRequest = {
  id: string;
  nome: string;
  valor: string;
  descricao: string;
  empresa_id: string;
};
export type ServicesRequest = {
  servicos: ServiceRequest[];
};

export type BrasilApiCEPRequest = {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
};
