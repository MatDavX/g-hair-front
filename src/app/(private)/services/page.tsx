import { WrapperLayoutInitial } from '@/components/wrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Serviços | G-Pet',
  description: 'Pagina de serviços da G-Pet'
};

export default function Page() {
  return (
    <WrapperLayoutInitial>
      <>Serviços</>
    </WrapperLayoutInitial>
  );
}
