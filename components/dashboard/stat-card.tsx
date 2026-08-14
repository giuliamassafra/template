import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type StatCardProps = {
  label: string
  value: string
  delta?: number
  hint?: string
  loading?: boolean
}

export function StatCard({ label, value, delta, hint, loading }: StatCardProps) {
  if (loading) {
    return (
      <Card>
        <CardContent className="flex flex-col gap-3 p-5">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-3 w-20" />
        </CardContent>
      </Card>
    )
  }

  const positive = (delta ?? 0) >= 0

  return (
    <Card className="transition-colors hover:border-primary/30">
      <CardContent className="flex flex-col gap-2 p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <div className="flex items-end justify-between gap-2">
          <span className="font-mono text-2xl font-semibold tracking-tight text-card-foreground">
            {value}
          </span>
          {delta !== undefined ? (
            <span
              className={cn(
                'flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-mono text-xs font-medium',
                positive ? 'bg-primary/10 text-primary' : 'bg-danger/10 text-danger',
              )}
            >
              {positive ? (
                <ArrowUpRight className="size-3" />
              ) : (
                <ArrowDownRight className="size-3" />
              )}
              {Math.abs(delta)}%
            </span>
          ) : null}
        </div>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </CardContent>
    </Card>
  )
}
