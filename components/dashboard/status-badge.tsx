import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { StatusLead, StatusPagamento } from '@/lib/trevopay-data'

const emerald =
  'border-transparent bg-primary/15 text-primary'
const amber =
  'border-transparent bg-warning/15 text-warning'
const rose =
  'border-transparent bg-danger/15 text-danger'
const zinc =
  'border-transparent bg-secondary text-muted-foreground'

const pagamentoMap: Record<StatusPagamento, { label: string; cls: string }> = {
  pago: { label: 'Pago', cls: emerald },
  pendente: { label: 'Pendente', cls: amber },
  recusado: { label: 'Recusado', cls: rose },
}

const leadMap: Record<StatusLead, { label: string; cls: string }> = {
  pago: { label: 'Pago', cls: emerald },
  novo: { label: 'Novo', cls: zinc },
  bloqueado: { label: 'Bloqueado', cls: rose },
}

export function PagamentoBadge({ status }: { status: StatusPagamento }) {
  const { label, cls } = pagamentoMap[status]
  return <Badge className={cn('font-mono', cls)}>{label}</Badge>
}

export function LeadBadge({ status }: { status: StatusLead }) {
  const { label, cls } = leadMap[status]
  return <Badge className={cls}>{label}</Badge>
}

export function StatusDot({ online }: { online: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium">
      <span
        className={cn(
          'size-2 rounded-full',
          online ? 'bg-primary shadow-[0_0_0_3px] shadow-primary/20' : 'bg-muted-foreground/40',
        )}
      />
      {online ? 'Online' : 'Offline'}
    </span>
  )
}
