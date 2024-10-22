'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

interface Props<TData> {
  table: Table<TData>;
}

export function ColumnView<TData>({ table }: Props<TData>) {
  const columnLabels: Record<string, string> = {
    name: 'Nome',
    username: 'Nome de Usuário',
    email: 'Email',
    phoneNumber: 'Número de Telefone',
    active: 'Ativo',
    role: 'Cargo',
    createdAt: 'Criado Em',
    updatedAt: 'Atualizado Em',
    city: 'Cidade',
    imageLink: 'Imagem',
    state: 'Estado',
    title: 'Título',
    price: 'Preço',
    content: 'Conteúdo',
    postCategory: 'Categoria',
    postImages: 'Imagens',
    subCategory: 'Sub Categória',
    post: 'Post',
    user: 'Usuário',
    postTextTags: 'Hashtags',
    postTextMentions: 'Menções',
    _count: 'Contagem',
    message: 'Mensagem',
    objectName: 'Nome do Objeto'
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          Visualização
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Esconder Colunas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onSelect={(e) => e.preventDefault()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {columnLabels[column.id] || column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
