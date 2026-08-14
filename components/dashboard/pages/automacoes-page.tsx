'use client'

import { useMemo, useState } from 'react'
import {
  Bot,
  Workflow,
  Megaphone,
  Send,
  Plus,
  Settings2,
  BarChart3,
  FileText,
  Import,
  type LucideIcon,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer'
import {
  bots,
  fluxos,
  remarketing,
  postagens,
  formatCompact,
  formatCurrency,
  type StatusBot,
  type AutomationCategory,
} from '@/lib/trevopay-data'
import { PageHeader } from '../page-header'
import { useLoading } from '../use-loading'
import { cn } from '@/lib/utils'

type CategoryConfig = {
  key: AutomationCategory
  label: string
  icon: LucideIcon
  actionLabel: string
  secondaryActionLabel: string
}

const categories: CategoryConfig[] = [
  { key: 'bots', label: 'Bots', icon: Bot, actionLabel: 'Criar Novo Bot', secondaryActionLabel: 'Importar Bot' },
  { key: 'fluxos', label: 'Fluxos', icon: Workflow, actionLabel: 'Criar Novo Fluxo', secondaryActionLabel: 'Importar Fluxo' },
  { key: 'remarketing', label: 'Remarketing', icon: Megaphone, actionLabel: 'Criar Remarketing', secondaryActionLabel: 'Importar Remarketing' },
  { key: 'postagens', label: 'Postagens', icon: Send, actionLabel: 'Criar Postagem', secondaryActionLabel: 'Importar Postagem' },
]

type AutomationCardItem = {
  id: string
  nome: string
  subtitle: string
  status: StatusBot
  leads: number
  conversao: number
  faturamento?: number
  meta: string
}

function toCardItems(category: AutomationCategory): AutomationCardItem[] {
  switch (category) {
    case 'bots':
      return bots.map((b) => ({
        id: b.id,
        nome: b.nome,
        subtitle: b.handle,
        status: b.status,
        leads: b.leads,
        conversao: b.leads > 0 ? (b.vendas / b.leads) * 100 : 0,
        faturamento: b.faturamento,
        meta: b.gateway,
      }))
    case 'fluxos':
      return fluxos.map((f) => ({
        id: f.id,
        nome: f.nome,
        subtitle: f.gatilho,
        status: f.status,
        leads: f.leads,
        conversao: f.conversao,
        meta: f.gatilho,
      }))
    case 'remarketing':
      return remarketing.map((r) => ({
        id: r.id,
        nome: r.nome,
        subtitle: r.canal,
        status: r.status,
        leads: r.leads,
        conversao: r.conversao,
        meta: r.canal,
      }))
    case 'postagens':
      return postagens.map((p) => ({
        id: p.id,
        nome: p.nome,
        subtitle: p.rede,
        status: p.status,
        leads: p.leads,
        conversao: p.conversao,
        meta: p.rede,
      }))
  }
}

function StatusBadge({ status }: { status: StatusBot }) {
  const online = status === 'online'
  return (
    <Badge
      variant="secondary"
      className={cn(
        'gap-1.5 font-medium',
        online
          ? 'bg-emerald-500/15 text-emerald-400'
          : 'bg-secondary text-stone-400',
      )}
    >
      <span
        className={cn(
          'size-1.5 rounded-full',
          online ? 'bg-emerald-400' : 'bg-stone-500',
        )}
      />
      {online ? 'Online' : 'Offline'}
    </Badge>
  )
}

function AutomationCard({
  item,
  icon: Icon,
  onSelect,
}: {
  item: AutomationCardItem
  icon: LucideIcon
  onSelect: (item: AutomationCardItem) => void
}) {
  return (
    <Card className="flex flex-col gap-0 overflow-hidden pb-0 ring-1 ring-foreground/10 transition-all hover:ring-primary/30">
      <CardHeader className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-5" />
            </span>
            <div className="flex flex-col">
              <span className="font-semibold text-card-foreground">{item.nome}</span>
              <span className="text-xs text-muted-foreground">{item.subtitle}</span>
            </div>
          </div>
          <StatusBadge status={item.status} />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 px-6 pb-6">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Leads totais</span>
            <span className="font-mono text-base font-semibold text-card-foreground">
              {formatCompact(item.leads)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Conversão</span>
            <span className="font-mono text-base font-semibold text-card-foreground">
              {item.conversao.toFixed(1)}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">
              {item.faturamento !== undefined ? 'Faturamento' : 'Meta'}
            </span>
            <span className="font-mono text-base font-semibold text-primary">
              {item.faturamento !== undefined
                ? formatCurrency(item.faturamento)
                : item.meta}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex items-stretch gap-0 border-t border-border bg-secondary/30 p-0">
        <Button
          variant="ghost"
          size="sm"
          className="h-10 flex-1 rounded-none"
          onClick={() => onSelect(item)}
        >
          <Settings2 data-icon="inline-start" />
          Editar
        </Button>
        <Separator orientation="vertical" className="h-auto" />
        <Button
          variant="ghost"
          size="sm"
          className="h-10 flex-1 rounded-none"
          onClick={() => onSelect(item)}
        >
          <BarChart3 data-icon="inline-start" />
          Analytics
        </Button>
        <Separator orientation="vertical" className="h-auto" />
        <Button
          variant="ghost"
          size="sm"
          className="h-10 flex-1 rounded-none"
          onClick={() => onSelect(item)}
        >
          <FileText data-icon="inline-start" />
          Logs
        </Button>
      </CardFooter>
    </Card>
  )
}

function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="p-6">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-lg" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-6 pb-6">
        <div className="grid grid-cols-3 gap-2">
          <Skeleton className="h-9" />
          <Skeleton className="h-9" />
          <Skeleton className="h-9" />
        </div>
      </CardContent>
    </Card>
  )
}

function DetailDrawer({
  item,
  category,
  open,
  onOpenChange,
}: {
  item: AutomationCardItem | null
  category: AutomationCategory
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const config = categories.find((c) => c.key === category)!
  const Icon = config.icon

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent className="w-full bg-popover sm:max-w-md">
        <DrawerHeader className="border-b border-border">
          <DrawerTitle className="flex items-center gap-2 text-base font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-4" />
            </span>
            {item?.nome ?? 'Detalhes'}
          </DrawerTitle>
          <DrawerDescription>
            {item?.subtitle}
          </DrawerDescription>
        </DrawerHeader>
        {item && (
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-6 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Status</span>
                <StatusBadge status={item.status} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 rounded-lg border border-border bg-card/40 p-4">
                  <span className="text-xs text-muted-foreground">Leads totais</span>
                  <span className="font-mono text-xl font-semibold text-card-foreground">
                    {formatCompact(item.leads)}
                  </span>
                </div>
                <div className="flex flex-col gap-1 rounded-lg border border-border bg-card/40 p-4">
                  <span className="text-xs text-muted-foreground">Conversão</span>
                  <span className="font-mono text-xl font-semibold text-card-foreground">
                    {item.conversao.toFixed(1)}%
                  </span>
                </div>
              </div>

              {item.faturamento !== undefined && (
                <div className="flex flex-col gap-1 rounded-lg border border-border bg-card/40 p-4">
                  <span className="text-xs text-muted-foreground">Faturamento</span>
                  <span className="font-mono text-xl font-semibold text-primary">
                    {formatCurrency(item.faturamento)}
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {category === 'bots' ? 'Gateway' : category === 'fluxos' ? 'Gatilho' : 'Canal/Rede'}
                </span>
                <Badge variant="secondary" className="w-fit font-mono">
                  {item.meta}
                </Badge>
              </div>

              <div className="flex flex-col gap-2 border-t border-border pt-4">
                <span className="text-sm font-medium">Ações rápidas</span>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <Settings2 data-icon="inline-start" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 data-icon="inline-start" />
                    Analytics
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText data-icon="inline-start" />
                    Logs
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        )}
      </DrawerContent>
    </Drawer>
  )
}

export function AutomacoesPage() {
  const loading = useLoading()
  const [activeCategory, setActiveCategory] = useState<AutomationCategory>('bots')
  const [selectedItem, setSelectedItem] = useState<AutomationCardItem | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const items = useMemo(() => toCardItems(activeCategory), [activeCategory])
  const activeConfig = categories.find((c) => c.key === activeCategory)!

  const handleSelect = (item: AutomationCardItem) => {
    setSelectedItem(item)
    setDrawerOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Central de Automação"
        description="Orquestre bots, fluxos, remarketing e postagens em um único painel."
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Import data-icon="inline-start" />
              {activeConfig.secondaryActionLabel}
            </Button>
            <Button size="sm">
              <Plus data-icon="inline-start" />
              {activeConfig.actionLabel}
            </Button>
          </div>
        }
      />

      <Tabs
        value={activeCategory}
        onValueChange={(v) => setActiveCategory(v as AutomationCategory)}
      >
        <TabsList>
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <TabsTrigger key={cat.key} value={cat.key}>
                <Icon data-icon="inline-start" />
                {cat.label}
              </TabsTrigger>
            )
          })}
        </TabsList>

        {categories.map((cat) => {
          const Icon = cat.icon
          const catItems = toCardItems(cat.key)
          return (
            <TabsContent key={cat.key} value={cat.key}>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
                  : catItems.map((item) => (
                      <AutomationCard
                        key={item.id}
                        item={item}
                        icon={Icon}
                        onSelect={handleSelect}
                      />
                    ))}
              </div>
            </TabsContent>
          )
        })}
      </Tabs>

      <DetailDrawer
        item={selectedItem}
        category={activeCategory}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  )
}
