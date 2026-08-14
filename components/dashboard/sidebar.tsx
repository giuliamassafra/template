'use client'

import { ChevronsUpDown, LogOut, Clover } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { navGroups, type PageKey } from './nav-config'

type SidebarProps = {
  active: PageKey
  onNavigate: (key: PageKey) => void
}

export function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-5">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <Clover className="size-5" />
        </span>
        <span className="text-lg font-bold tracking-tight">
          <span className="text-primary">TREVO</span>
          <span className="font-light text-stone-200">PAY</span>
        </span>
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Navegação agrupada */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-6">
          {navGroups.map((group) => (
            <div
              key={group.label}
              className={cn(
                'flex flex-col gap-1',
                group.topSeparator && 'mt-1 border-t border-sidebar-border pt-5',
              )}
            >
              <p className="px-3 pb-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {group.label}
              </p>
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = active === item.key
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => onNavigate(item.key)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Rodapé: trocar conta/bot + deslogar */}
      <div className="flex flex-col gap-2 border-t border-sidebar-border p-3">
        <button
          type="button"
          className="flex items-center gap-3 rounded-lg border border-sidebar-border bg-sidebar-accent/50 px-3 py-2 text-left transition-colors hover:bg-sidebar-accent"
        >
          <span className="flex size-8 items-center justify-center rounded-md bg-primary/15 text-xs font-bold text-primary">
            VV
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-medium">Vendas VIP</span>
            <span className="truncate text-xs text-muted-foreground">@vendas_vip</span>
          </span>
          <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
        </button>
        <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
          <LogOut className="size-4" data-icon="inline-start" />
          Deslogar
        </Button>
      </div>
    </aside>
  )
}
