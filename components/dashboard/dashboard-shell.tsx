'use client'

import { useState } from 'react'
import { Construction } from 'lucide-react'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'
import { pageTitles, type PageKey } from './nav-config'
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from '@/components/ui/drawer'
import { DashboardPage } from './pages/dashboard-page'
import { FinanceiroPage } from './pages/financeiro-page'
import { ClientesPage } from './pages/clientes-page'
import { AutomacoesPage } from './pages/automacoes-page'
import { PageHeader } from './page-header'

function EmBreve({ page }: { page: PageKey }) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={pageTitles[page]} description="Módulo em construção." />
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/40 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Construction className="size-6" />
        </span>
        <div className="flex flex-col gap-1">
          <p className="font-medium text-card-foreground">Em breve</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Esta seção faz parte do roadmap da TrevoPay e estará disponível em breve.
          </p>
        </div>
      </div>
    </div>
  )
}

function renderPage(page: PageKey) {
  switch (page) {
    case 'dashboard':
      return <DashboardPage />
    case 'financeiro':
      return <FinanceiroPage />
    case 'clientes':
      return <ClientesPage />
    case 'automacoes':
      return <AutomacoesPage />
    default:
      return <EmBreve page={page} />
  }
}

export function DashboardShell() {
  const [active, setActive] = useState<PageKey>('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavigate = (key: PageKey) => {
    setActive(key)
    setMobileOpen(false)
  }

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
      {/* Sidebar fixa (desktop) */}
      <div className="hidden lg:block">
        <Sidebar active={active} onNavigate={handleNavigate} />
      </div>

      {/* Sidebar mobile (drawer lateral) */}
      <Drawer open={mobileOpen} onOpenChange={setMobileOpen} swipeDirection="left">
        <DrawerContent className="w-64 bg-sidebar p-0">
          <DrawerTitle className="sr-only">Navegação</DrawerTitle>
          <Sidebar active={active} onNavigate={handleNavigate} />
        </DrawerContent>
      </Drawer>

      {/* Área principal */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onOpenMenu={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto w-full max-w-[1400px]">{renderPage(active)}</div>
        </main>
      </div>
    </div>
  )
}
