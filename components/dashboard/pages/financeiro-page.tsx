'use client'

import { useMemo, useState } from 'react'
import { Download, Plus } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import {
  formatCurrency,
  resumoFinanceiro,
  transacoes,
  type StatusPagamento,
} from '@/lib/trevopay-data'
import { PageHeader } from '../page-header'
import { StatCard } from '../stat-card'
import { PagamentoBadge } from '../status-badge'
import { useLoading } from '../use-loading'

function FiltroSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as string)}>
      <SelectTrigger className="h-8 w-full min-w-36 sm:w-auto" aria-label={label}>
        <span className="text-muted-foreground">{label}:</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function FinanceiroPage() {
  const loading = useLoading()
  const [gateway, setGateway] = useState('todos')
  const [status, setStatus] = useState('todos')
  const [periodo, setPeriodo] = useState('7d')

  const filtradas = useMemo(() => {
    return transacoes.filter((t) => {
      if (gateway !== 'todos' && t.gateway !== gateway) return false
      if (status !== 'todos' && t.status !== status) return false
      return true
    })
  }, [gateway, status])

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Financeiro"
        description="Acompanhe Pix, conciliação e transações da operação."
        action={
          <>
            <Button variant="outline" size="sm">
              <Download data-icon="inline-start" />
              Exportar
            </Button>
            <Button size="sm">
              <Plus data-icon="inline-start" />
              Solicitar saque
            </Button>
          </>
        }
      />

      {/* Filtros globais */}
      <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3 sm:flex-row sm:flex-wrap sm:items-center">
        <FiltroSelect
          label="Período"
          value={periodo}
          onChange={setPeriodo}
          options={[
            { value: 'hoje', label: 'Hoje' },
            { value: '7d', label: 'Últimos 7 dias' },
            { value: '30d', label: 'Últimos 30 dias' },
            { value: '90d', label: 'Últimos 90 dias' },
          ]}
        />
        <FiltroSelect
          label="Gateway"
          value={gateway}
          onChange={setGateway}
          options={[
            { value: 'todos', label: 'Todos' },
            { value: 'BravoPay', label: 'BravoPay' },
            { value: 'PagStar', label: 'PagStar' },
            { value: 'ZuxPay', label: 'ZuxPay' },
          ]}
        />
        <FiltroSelect
          label="Status"
          value={status}
          onChange={setStatus}
          options={[
            { value: 'todos', label: 'Todos' },
            { value: 'pago', label: 'Pago' },
            { value: 'pendente', label: 'Pendente' },
            { value: 'recusado', label: 'Recusado' },
          ]}
        />
        <span className="text-xs text-muted-foreground sm:ml-auto">
          {filtradas.length} transações
        </span>
      </div>

      {/* Blocos de resumo */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {resumoFinanceiro.map((r) => (
          <StatCard
            key={r.id}
            label={r.label}
            value={r.valor}
            delta={r.delta}
            loading={loading}
          />
        ))}
      </div>

      {/* Tabela de transações */}
      <Card>
        <CardHeader>
          <CardTitle>Transações recentes</CardTitle>
          <CardDescription>Movimentações mais recentes da conta</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-11 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Gateway</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right">Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtradas.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-card-foreground">{t.cliente}</span>
                          <span className="text-xs text-muted-foreground">{t.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{t.gateway}</TableCell>
                      <TableCell>
                        <PagamentoBadge status={t.status as StatusPagamento} />
                      </TableCell>
                      <TableCell className="text-right font-mono font-medium text-card-foreground">
                        {formatCurrency(t.valor)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs text-muted-foreground">
                        {t.data}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
