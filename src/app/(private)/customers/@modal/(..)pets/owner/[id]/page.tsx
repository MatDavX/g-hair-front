import { people } from '@/app/api/fake';
import { Modal } from '../../../../_components/modal';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getNameWithSpace } from '@/lib/lib/avatar-format-name';
import { Icon } from '@/lib/icons';
import { TooltipWrapper } from '@/components/tooltip';

type Props = {
  params: { id: number };
};

export default function PetModal({ params: { id } }: Props) {
  const pets = people.find((customer) => customer.id === +id)?.pets;

  return (
    <Modal>
      <div className="grid grid-cols-2 gap-3">
        {pets?.map((pet) => (
          <div
            key={pet.id.toString()}
            className="border w-full justify-between items-center h-fit px-2 py-2 rounded-md flex"
          >
            <div className="flex items-center gap-3">
              <TooltipWrapper
                description={pet.type == 'dog' ? 'Cachorro' : 'Gato'}
              >
                <Avatar>
                  <AvatarFallback>
                    {pet.type == 'dog' ? <Icon.dog /> : <Icon.cat />}
                  </AvatarFallback>
                </Avatar>
              </TooltipWrapper>
              <div className="flex flex-col">
                <p className="font-medium">{pet.name}</p>
                <p className="text-sm text-primary">{pet.race}</p>
              </div>
            </div>

            <div>
              <Icon.squareArrow size={20} className="mr-1" />
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
