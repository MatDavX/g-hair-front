'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { SchedulingRequest } from '@/types/response';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { Button } from '@/components/ui/button';

type SchedulingProps = {
  scheduling: SchedulingRequest;
};
export function ViewSchedulingDialog({ scheduling }: SchedulingProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">Agendamento</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do agendamento</DialogTitle>
            <DialogDescription>
              Confira os detalhes do agendamento.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="space-y-1">
              <Label>Data e hora do agendamento</Label>
              <Input
                readOnly
                defaultValue={scheduling.agendamento.data_hora
                  .toString()
                  ?.replace('.000Z', '')}
                name="calendar"
                type="datetime-local"
                alt="Campo de agendamento"
              />
            </div>
            <div className="space-y-1">
              <Label>Cliente</Label>
              <Input readOnly defaultValue={scheduling.cliente.nome} />
            </div>
            <div className="space-y-1">
              <Label>Funcionário</Label>
              <Input readOnly defaultValue={scheduling.funcionario.nome} />
            </div>
            <div className="space-y-1">
              <Label>Serviço</Label>
              <Input readOnly defaultValue={scheduling.servico.nome} />
            </div>
            <div className="space-y-1 col-span-2">
              <Label>Descrição</Label>
              <Textarea
                readOnly
                defaultValue={scheduling.agendamento.descricao}
                name="description"
                placeholder="Descrição do agendamento"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
