'use client'

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { RefreshCw, Plus, ShoppingBag, UserPlus, Banknote, Zap } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  atividades,
  desempenho,
  metricasDashboard,
  type Atividade,
} from '@/lib/trevopay-data'
import { PageHeader } from '../page-header'
import { StatCard } from '../stat-card'
import { useLoading } from '../use-loading'

const chartConfig = {
  faturamento: { label: 'Faturamento', color: 'var(--chart-1)' },
  starts: { label: 'Starts', color: 'var(--chart-4)' },
} satisfies ChartConfig

const atividadeIcons = {
  venda: ShoppingBag,
  lead: UserPlus,
  saque: Banknote,
  sistema: Zap,
} as const

function AtividadeItem({ item }: { item: Atividade }) {
  const Icon = atividadeIcons[item.tipo]
  return (
    <li className="flex items-center gap-3 py-3">
      <span
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-lg',
          item.tipo === 'venda'
            ? 'bg-primary/10 text-primary'
            : 'bg-secondary text-muted-foreground',
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm text-card-foreground">{item.texto}</span>
        <span className="text-xs text-muted-foreground">{item.tempo}</span>
      </div>
      {item.valor ? (
        <span className="font-mono text-sm font-medium text-primary">{item.valor}</span>
      ) : null}
    </li>
  )
}

export function DashboardPage() {
  const loading = useLoading()

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Dashboard"
        description="Visão consolidada do desempenho da sua operação."
        action={
          <>
            <Button variant="outline" size="sm">
              <RefreshCw data-icon="inline-start" />
              Sincronizar
            </Button>
            <Button size="sm">
              <Plus data-icon="inline-start" />
              Criar campanha
            </Button>
          </>
        }
      />

      {/* Grid de métricas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metricasDashboard.map((m) => (
          <StatCard
            key={m.id}
            label={m.label}
            value={m.valor}
            delta={m.delta}
            hint={m.hint}
            loading={loading}
          />
        ))}
      </div>

      {/* Gráfico + Log */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Desempenho semanal</CardTitle>
            <CardDescription>Faturamento e volume de starts nos últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[280px] w-full" />
            ) : (
              <ChartContainer config={chartConfig} className="h-[280px] w-full">
                <LineChart data={desempenho} margin={{ left: 4, right: 12, top: 8 }}>
                  <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="4 4" />
                  <XAxis
                    dataKey="dia"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    width={44}
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickFormatter={(v) => `${v / 1000}k`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    dataKey="faturamento"
                    type="monotone"
                    stroke="var(--color-faturamento)"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                  <Line
                    dataKey="starts"
                    type="monotone"
                    stroke="var(--color-starts)"
                    strokeWidth={2}
                    strokeDasharray="5 4"
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        {/* Log de atividades */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Log de atividades</CardTitle>
            <CardDescription>Eventos em tempo real</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex flex-col gap-4 px-6 pb-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="size-8 rounded-lg" />
                    <div className="flex flex-1 flex-col gap-1.5">
                      <Skeleton className="h-3.5 w-full" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ScrollArea className="h-[280px] px-6">
                <ul className="divide-y divide-border">
                  {atividades.map((a) => (
                    <AtividadeItem key={a.id} item={a} />
                  ))}
                </ul>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
