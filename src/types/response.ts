export type SchedulingRequest = {
  agendamento: {
    id: string;
    data_hora: Date;
    descricao: string;
  };
  cliente: {
    id: string;
    nome: string;
  };
  funcionario: {
    id: string;
    nome: string;
  };
  servico: {
    id: string;
    nome: string;
  };
  status: string;
};

export type CustomerRequest = {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  data_nascimento: Date;
  ultimo_servico: string;
};

export type BoxFinanceRequest = {
  id: string;
  metodo_de_pagamento: string;
  agendamento: {
    id: string;
    nome: string;
  };
  valor_total: number;
  valor_desconto: number;
  valor_acrescimo: number;
} & SchedulingRequest;

export type ServicesRequest = {
  id: string;
  nome: string;
  valor: number;
  descricao: string;
};

export type CalculatorRequest = {
  agendamentos: {
    id: string;
    data_hora: string;
    servico_id: string;
    funcionario_id: string;
    cliente_id: string;
    status: string;
    descricao: string;
    created_at: string;
    updated_at: string;
    folhaId: string;
    caixa: {
      agendamento_id: string;
      id: string;
      metodo_de_pagamento_id: string;
      status: string;
      valor_acrescimo: number;
      valor_desconto: number;
      valor_total: number;
    };
  }[];
  funcionario: {
    id: string;
    nome: string;
    data_nascimento: string;
    cpf: string;
    telefone: string;
    empresa_id: string;
    endereco_id: string;
    ativo: boolean;
    comissao: number;
    created_at: string;
    updated_at: string;
  };
  comissao: number;
  total_servicos: number;
  total_pagar: number;
};

export type EmployerRequest = {
  id: string;
  nome: string;
  ativo: boolean;
  data_nascimento: Date;
  telefone: string;
  comissao: number;
};

export type SelectRequest = {
  id: string;
  nome: string;
};
