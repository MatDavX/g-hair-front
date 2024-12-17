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
