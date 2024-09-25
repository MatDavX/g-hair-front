import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/lib/icons';
import React from 'react';
import { InputForm } from '../alter';
import Link from 'next/link';

interface Props {
  row: any;
}
export function RowAction({ row }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenDrop, setIsOpenDrop] = React.useState(false);
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

      <DropdownMenu open={isOpenDrop} onOpenChange={setIsOpenDrop}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Opções</span>
            <Icon.moreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Opções</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link
              className="flex items-center w-full h-full"
              onClick={() => setIsOpenDrop(false)}
              key={row.id}
              href={`/pets/owner/${row.id}`}
              passHref
            >
              <Icon.paw className="mr-2 w-4 h-4" />
              Pets Vinculados
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="bg-destructive">
            <Icon.x className="mr-2 w-4 h-4" />
            Inativar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
