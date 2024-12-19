'use client';
import { useCalculatorStore } from '@/lib/zustand/use-calculator-store';
import type {
  CustomerRequest,
  SelectRequest,
  ServicesRequest,
} from '@/types/response';
import { ScrollArea } from '@/components/ui/scroll-area';

import { format } from 'date-fns';
import { formatNumberToCurrency } from '@/utils/format-to-currency';
type Props = {
  data: {
    service: ServicesRequest[];
    customers: CustomerRequest[];
    methods: SelectRequest[];
  };
};
export function ViwCalculators({ data }: Props) {
  const { calculator_result } = useCalculatorStore();
  function getServiceName(id: string) {
    return data?.service.find(item => item.id === id)?.nome;
  }
  function getCustomerName(id: string) {
    return data?.customers.find(item => item.id === id)?.nome;
  }
  function getMethodName(id: string) {
    return data?.methods.find(item => item.id === id)?.nome;
  }
  return (
    <div>
      <ScrollArea className="h-[600px] w-full mb-4">
        {calculator_result ? (
          calculator_result.agendamentos.map(item => {
            return (
              <div key={item.id} className="p-4">
                <p>
                  <span className="font-semibold">Cliente: </span>
                  {getCustomerName(item.cliente_id)}
                </p>
                <p>
                  <span className="font-semibold">Data/Hora: </span>
                  {format(item.data_hora, 'dd/MM/yyyy HH:mm')}
                </p>
                <p>
                  <span className="font-semibold">Descrição: </span>
                  {item.descricao || '-'}
                </p>
                <p>
                  <span className="font-semibold">Serviço: </span>
                  {getServiceName(item.servico_id)}
                </p>
                <p>--------------</p>
                <span className="font-semibold">Caixa: </span>
                <p>
                  <span className="font-semibold">Método de pagamento: </span>
                  {getMethodName(item.caixa.metodo_de_pagamento_id)}
                </p>
                <p>
                  <span className="font-semibold">Valor desconto: </span>
                  {formatNumberToCurrency(item.caixa.valor_desconto)}
                </p>
                <p>
                  <span className="font-semibold">Valor total: </span>
                  {formatNumberToCurrency(item.caixa.valor_total)}
                </p>
              </div>
            );
          })
        ) : (
          <p className="p-4">Nenhum resultado encontrado</p>
        )}
      </ScrollArea>
      <p className="grid gap-4 px-4">
        <p>
          <span className="font-semibold">Total em serviços: </span>
          {formatNumberToCurrency(calculator_result?.total_servicos!)}{' '}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Total a pagar: </span>
          {formatNumberToCurrency(calculator_result?.total_pagar!)}{' '}
        </p>
      </p>
    </div>
  );
}
