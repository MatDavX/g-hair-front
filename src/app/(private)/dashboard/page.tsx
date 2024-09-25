import { WrapperLayoutInitial } from '@/components/wrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | G-Pet',
  description: 'Pagina de dashboard da G-Pet'
};

export default function Page() {
  return (
    <WrapperLayoutInitial>
      <>Dashboard</>
    </WrapperLayoutInitial>
  );
}
