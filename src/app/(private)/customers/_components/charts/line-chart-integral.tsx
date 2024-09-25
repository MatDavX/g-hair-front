'use client';

import { Area, AreaChart, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { format } from '@/lib/lib/format-date';
import { ptBR } from 'date-fns/locale';
const chartData = [
  { month: 'Janeiro', customers: 186 },
  { month: 'Fevereiro', customers: 305 },
  { month: 'Março', customers: 237 },
  { month: 'Abril', customers: 73 },
  { month: 'Maio', customers: 209 },
  { month: 'Junho', customers: 214 }
];

export function LineChartCustomersIntegral() {
  const dateNow = format(new Date(), 'dd LLL, y', { locale: ptBR });

  return (
    <Card className="max-w-xs" x-chunk="charts-01-chunk-7">
      <CardHeader className="space-y-0 pb-0">
        <CardDescription>
          Usuários por mês:
          <span className="font-normal text-3xl text-white"> 35</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={{
            time: {
              label: 'Time',
              color: 'hsl(var(--primary))'
            }
          }}
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
              top: 10,
              bottom: 1
            }}
          >
            <XAxis dataKey="month" hide />
            <YAxis domain={['dataMin - 5', 'dataMax + 2']} hide />
            <defs>
              <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="customers"
              type="natural"
              fill="url(#fillTime)"
              fillOpacity={0.4}
              stroke="hsl(var(--primary))"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              formatter={(value) => (
                <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                  {value}
                </div>
              )}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
