'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { format } from '@/lib/lib/format-date';
import { ptBR } from 'date-fns/locale';
const chartData = [
  { month: 'Janeiro', desktop: 186 },
  { month: 'Fevereiro', desktop: 305 },
  { month: 'Março', desktop: 237 },
  { month: 'Abril', desktop: 73 },
  { month: 'Maio', desktop: 209 },
  { month: 'Junho', desktop: 214 }
];

const chartConfig = {
  desktop: {
    label: 'Clientes',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

export function LineChartCustomers() {
  const dateNow = format(new Date(), 'dd LLL, y', { locale: ptBR });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastro de usuários</CardTitle>
        <CardDescription>
          Mensura de novos usuários cadastrados.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="desktop"
              type="linear"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Ultima atualização {dateNow}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
