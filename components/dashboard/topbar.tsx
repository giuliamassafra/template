'use client'

import { Bell, HelpCircle, Settings, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { formatCurrency } from '@/lib/trevopay-data'

type TopbarProps = {
  onOpenMenu?: () => void
}

const META = 250000
const ATUAL = 184320

function saudacao() {
  const h = new Date().getHours()
  if (h < 5) return 'Boa madrugada'
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

export function Topbar({ onOpenMenu }: TopbarProps) {
  const pct = Math.round((ATUAL / META) * 100)
  const hoje = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(new Date())

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onOpenMenu}
        aria-label="Abrir menu"
      >
        <Menu className="size-5" />
      </Button>

      {/* Saudação */}
      <div className="flex min-w-0 flex-col">
        <p className="truncate text-sm font-semibold">
          {saudacao()}, <span className="text-primary">Gabriel</span>
        </p>
        <p className="truncate text-xs capitalize text-muted-foreground">{hoje}</p>
      </div>

      {/* Meta de faturamento */}
      <div className="ml-auto hidden w-64 flex-col gap-1.5 rounded-lg border border-border bg-card px-3 py-2 md:flex">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Meta de Faturamento</span>
          <span className="font-mono font-semibold text-primary">{pct}%</span>
        </div>
        <Progress value={pct} className="h-1.5" />
        <div className="flex items-center justify-between text-[0.7rem] text-muted-foreground">
          <span className="font-mono">{formatCurrency(ATUAL)}</span>
          <span className="font-mono">{formatCurrency(META)}</span>
        </div>
      </div>

      {/* Atalhos rápidos */}
      <div className="flex items-center gap-1 md:ml-2">
        <Button variant="ghost" size="icon" aria-label="Ajuda">
          <HelpCircle className="size-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notificações" className="relative">
          <Bell className="size-5" />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Configurações">
          <Settings className="size-5" />
        </Button>
      </div>
    </header>
  )
}
