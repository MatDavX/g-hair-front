import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Icon } from '@/lib/icons';
import React from 'react';
import { InputForm } from '../alter';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { handleDelete } from '../server-action';
import { useSession } from 'next-auth/react';

interface Props {
  row: any;
}
export function RowAction({ row }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const session = useSession();

  return (
    <div className="space-x-2">
      <Dialog modal onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Icon.squarePen className="w-4 h-4" />
            <span className="sr-only">Editar</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastro de Cliente</DialogTitle>
            <DialogDescription>
              Formulário responsável por alterar o cadastro do cliente{' '}
              <span className="text-primary">{row.name}</span>
            </DialogDescription>
          </DialogHeader>
          <InputForm row={row} setIsOpen={setIsOpen} />
        </DialogContent>
      </Dialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="icon">
            <span className="sr-only">Opções</span>
            <Icon.trash className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja realizar esta alteração?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta alteração não poderá ser desfeita, deseja mesmo assim
              continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(row.id, session?.data?.user?.token!)}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
