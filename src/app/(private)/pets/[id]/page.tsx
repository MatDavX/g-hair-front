import { people } from '@/app/api/fake';
import { ButtonBack } from '@/components/button-back';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clientes | G-Pet',
  description: 'Pagina de clientes da G-Pet'
};

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const findUser = people.find(
    (costumers) => params.id == costumers.id.toString()
  );
  return (
    <>
      <div className="flex gap-2 items-center h-fit">
        <ButtonBack />
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-lg">{findUser?.name}</p>
        </div>
      </div>
      <div className="ml-10 flex gap-2">
        {findUser?.tags.map((tag) => (
          <div key={tag.id}>
            <Badge
              style={{
                backgroundColor: tag.color
              }}
            >
              {tag.description}
            </Badge>
          </div>
        ))}
      </div>
      <Separator className="my-6" />
      <section className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <p>Observações</p>
          <Textarea
            className="resize-none"
            placeholder="Digite uma observação"
          />
          <Button className="self-end max-w-[100px]">Enviar</Button>
        </div>
        <div className="mt-4">
          <p className="mb-2">Histórico de Observações</p>
          {findUser?.observation.map((obs) => (
            <div className="mb-2" key={obs.id}>
              <Textarea
                disabled
                className="border-primary resize-none"
                value={obs.description}
              />
              <p className="text-sm text-end">{obs.date}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
