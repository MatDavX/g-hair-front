import { WrapperLayoutInitial } from '@/components/wrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pets | G-Pet',
  description: 'Pagina de pets da G-Pet'
};

export default function Page() {
  return (
    <WrapperLayoutInitial>
      <>Pets</>
    </WrapperLayoutInitial>
  );
}
