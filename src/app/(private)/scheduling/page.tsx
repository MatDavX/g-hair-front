import { WrapperLayoutInitial } from '@/components/wrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agendamento | G-Pet',
  description: 'Pagina de agendamento da G-Pet'
};

export default function Page() {
  return (
    <WrapperLayoutInitial>
      <>Agendamento</>
    </WrapperLayoutInitial>
  );
}
