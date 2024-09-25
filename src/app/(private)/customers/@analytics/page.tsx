import { Metadata } from 'next';
import { LineChartCustomers } from '../_components/charts/line-chart';
import { people } from '@/app/api/fake';
import { LineChartCustomersIntegral } from '../_components/charts/line-chart-integral';

export const metadata: Metadata = {
  title: 'Clientes | G-Pet',
  description: 'Pagina de gráficos de clientes da G-Pet'
};

export default function PageAnalytics() {
  const dataCharts = people;

  return (
    <div className="grid grid-cols-3 gap-2 h-fit">
      {/* <LineChartCustomers /> */}
      <LineChartCustomersIntegral />
      {/* <LineChartCustomers /> */}
    </div>
  );
}
