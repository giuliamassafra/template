'use client'

import { useMemo, useState } from 'react'
import { MessageCircle, Search, UserPlus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { clientes, formatCurrency } from '@/lib/trevopay-data'
import { PageHeader } from '../page-header'
import { LeadBadge } from '../status-badge'
import { useLoading } from '../use-loading'

function iniciais(nome: string) {
  return nome
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

export function ClientesPage() {
  const loading = useLoading()
  const [busca, setBusca] = useState('')

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase()
    if (!q) return clientes
    return clientes.filter(
      (c) => c.nome.toLowerCase().includes(q) || c.email.toLowerCase().includes(q),
    )
  }, [busca])

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Base de Clientes"
        description="CRM com leads, status e histórico de compras."
        action={
          <Button size="sm">
            <UserPlus data-icon="inline-start" />
            Adicionar cliente
          </Button>
        }
      />

      <div className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome ou e-mail..."
          className="pl-9"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col gap-3 p-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead className="text-right">Total gasto</TableHead>
                    <TableHead className="text-right">Última compra</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtrados.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarFallback className="bg-secondary text-xs font-medium text-muted-foreground">
                              {iniciais(c.nome)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex min-w-0 flex-col">
                            <span className="truncate font-medium text-card-foreground">
                              {c.nome}
                            </span>
                            <span className="truncate text-xs text-muted-foreground">
                              {c.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <LeadBadge status={c.status} />
                      </TableCell>
                      <TableCell className="text-muted-foreground">{c.origem}</TableCell>
                      <TableCell className="text-right font-mono text-card-foreground">
                        {formatCurrency(c.totalGasto)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs text-muted-foreground">
                        {c.ultimaCompra}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="xs"
                          disabled={c.status === 'bloqueado'}
                        >
                          <MessageCircle data-icon="inline-start" />
                          Abrir Chat
                        </Button>
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
