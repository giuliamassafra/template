export type StatusPagamento = 'pago' | 'pendente' | 'recusado'
export type StatusLead = 'novo' | 'pago' | 'bloqueado'
export type StatusBot = 'online' | 'offline'

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatCompact(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export type Metrica = {
  id: string
  label: string
  valor: string
  delta: number
  hint: string
}

export const metricasDashboard: Metrica[] = [
  { id: 'faturamento', label: 'Faturamento Bruto', valor: formatCurrency(184320.5), delta: 12.4, hint: 'vs. semana anterior' },
  { id: 'liquido', label: 'Receita Líquida', valor: formatCurrency(162201.9), delta: 11.2, hint: 'após taxas e reembolsos' },
  { id: 'conversao', label: 'Taxa de Conversão', valor: '4,82%', delta: 0.6, hint: 'starts → pagos' },
  { id: 'aprovacao', label: 'Taxa de Aprovação', valor: '92,7%', delta: 1.8, hint: 'pagamentos aprovados' },
]

export type PontoGrafico = { dia: string; faturamento: number; starts: number }

export const desempenho: PontoGrafico[] = [
  { dia: 'Seg', faturamento: 18400, starts: 3200 },
  { dia: 'Ter', faturamento: 22100, starts: 4100 },
  { dia: 'Qua', faturamento: 19800, starts: 3800 },
  { dia: 'Qui', faturamento: 28600, starts: 5200 },
  { dia: 'Sex', faturamento: 34200, starts: 6100 },
  { dia: 'Sáb', faturamento: 41800, starts: 7400 },
  { dia: 'Dom', faturamento: 39420, starts: 6900 },
]

export type Atividade = {
  id: string
  tipo: 'venda' | 'lead' | 'saque' | 'sistema'
  texto: string
  tempo: string
  valor?: string
}

export const atividades: Atividade[] = [
  { id: 'a1', tipo: 'venda', texto: 'Venda aprovada — Plano Premium', tempo: 'agora', valor: formatCurrency(197) },
  { id: 'a2', tipo: 'lead', texto: 'Novo start no bot @vendas_vip', tempo: 'há 1 min' },
  { id: 'a3', tipo: 'venda', texto: 'Pix confirmado — Mentoria', tempo: 'há 3 min', valor: formatCurrency(497) },
  { id: 'a4', tipo: 'saque', texto: 'Saque solicitado', tempo: 'há 8 min', valor: formatCurrency(12000) },
  { id: 'a5', tipo: 'sistema', texto: 'Fluxo de remarketing disparado', tempo: 'há 12 min' },
  { id: 'a6', tipo: 'venda', texto: 'Venda aprovada — Order Bump', tempo: 'há 15 min', valor: formatCurrency(47) },
  { id: 'a7', tipo: 'lead', texto: 'Lead bloqueado por spam', tempo: 'há 21 min' },
  { id: 'a8', tipo: 'venda', texto: 'Pix confirmado — Assinatura', tempo: 'há 26 min', valor: formatCurrency(29.9) },
  { id: 'a9', tipo: 'sistema', texto: 'Gateway BravoPay reconectado', tempo: 'há 33 min' },
  { id: 'a10', tipo: 'venda', texto: 'Venda aprovada — Combo', tempo: 'há 40 min', valor: formatCurrency(147) },
]

export type ResumoFinanceiro = {
  id: string
  label: string
  valor: string
  delta: number
}

export const resumoFinanceiro: ResumoFinanceiro[] = [
  { id: 'gerados', label: 'Pix Gerados', valor: formatCurrency(412890), delta: 9.2 },
  { id: 'pagos', label: 'Pix Pagos', valor: formatCurrency(184320), delta: 12.4 },
  { id: 'pendentes', label: 'Pix Pendentes', valor: formatCurrency(228570), delta: -4.8 },
  { id: 'conversao', label: 'Taxa de Conversão', valor: '44,6%', delta: 3.1 },
]

export type Transacao = {
  id: string
  cliente: string
  email: string
  gateway: string
  status: StatusPagamento
  valor: number
  data: string
}

export const transacoes: Transacao[] = [
  { id: 'TP-90231', cliente: 'Marina Alves', email: 'marina@email.com', gateway: 'BravoPay', status: 'pago', valor: 197, data: '14/08 03:12' },
  { id: 'TP-90230', cliente: 'Rafael Souza', email: 'rafael@email.com', gateway: 'PagStar', status: 'pendente', valor: 497, data: '14/08 03:04' },
  { id: 'TP-90229', cliente: 'Juliana Dias', email: 'ju.dias@email.com', gateway: 'BravoPay', status: 'pago', valor: 47, data: '14/08 02:58' },
  { id: 'TP-90228', cliente: 'Carlos Mendes', email: 'carlos@email.com', gateway: 'ZuxPay', status: 'recusado', valor: 147, data: '14/08 02:41' },
  { id: 'TP-90227', cliente: 'Beatriz Lima', email: 'bia@email.com', gateway: 'PagStar', status: 'pago', valor: 29.9, data: '14/08 02:33' },
  { id: 'TP-90226', cliente: 'Diego Rocha', email: 'diego@email.com', gateway: 'BravoPay', status: 'pendente', valor: 297, data: '14/08 02:20' },
  { id: 'TP-90225', cliente: 'Fernanda Reis', email: 'fe.reis@email.com', gateway: 'ZuxPay', status: 'pago', valor: 97, data: '14/08 02:11' },
  { id: 'TP-90224', cliente: 'Lucas Prado', email: 'lucas@email.com', gateway: 'PagStar', status: 'pago', valor: 197, data: '14/08 01:59' },
  { id: 'TP-90223', cliente: 'Patrícia Gomes', email: 'paty@email.com', gateway: 'BravoPay', status: 'recusado', valor: 47, data: '14/08 01:47' },
  { id: 'TP-90222', cliente: 'André Nunes', email: 'andre@email.com', gateway: 'ZuxPay', status: 'pendente', valor: 497, data: '14/08 01:32' },
]

export type Cliente = {
  id: string
  nome: string
  email: string
  telefone: string
  status: StatusLead
  totalGasto: number
  ultimaCompra: string
  origem: string
}

export const clientes: Cliente[] = [
  { id: 'c1', nome: 'Marina Alves', email: 'marina@email.com', telefone: '+55 11 9****-1201', status: 'pago', totalGasto: 1284, ultimaCompra: '14/08', origem: '@vendas_vip' },
  { id: 'c2', nome: 'Rafael Souza', email: 'rafael@email.com', telefone: '+55 21 9****-4432', status: 'novo', totalGasto: 0, ultimaCompra: '—', origem: 'Bio Link' },
  { id: 'c3', nome: 'Juliana Dias', email: 'ju.dias@email.com', telefone: '+55 31 9****-8890', status: 'pago', totalGasto: 594, ultimaCompra: '14/08', origem: '@promo_bot' },
  { id: 'c4', nome: 'Carlos Mendes', email: 'carlos@email.com', telefone: '+55 41 9****-2277', status: 'bloqueado', totalGasto: 0, ultimaCompra: '—', origem: 'Remarketing' },
  { id: 'c5', nome: 'Beatriz Lima', email: 'bia@email.com', telefone: '+55 11 9****-6654', status: 'pago', totalGasto: 329, ultimaCompra: '13/08', origem: '@vendas_vip' },
  { id: 'c6', nome: 'Diego Rocha', email: 'diego@email.com', telefone: '+55 51 9****-3321', status: 'novo', totalGasto: 0, ultimaCompra: '—', origem: 'Tráfego Pago' },
  { id: 'c7', nome: 'Fernanda Reis', email: 'fe.reis@email.com', telefone: '+55 71 9****-7788', status: 'pago', totalGasto: 970, ultimaCompra: '13/08', origem: '@promo_bot' },
  { id: 'c8', nome: 'Lucas Prado', email: 'lucas@email.com', telefone: '+55 11 9****-9012', status: 'pago', totalGasto: 197, ultimaCompra: '12/08', origem: 'Bio Link' },
  { id: 'c9', nome: 'Patrícia Gomes', email: 'paty@email.com', telefone: '+55 19 9****-5566', status: 'bloqueado', totalGasto: 47, ultimaCompra: '10/08', origem: 'Remarketing' },
  { id: 'c10', nome: 'André Nunes', email: 'andre@email.com', telefone: '+55 85 9****-1199', status: 'novo', totalGasto: 0, ultimaCompra: '—', origem: 'Tráfego Pago' },
  { id: 'c11', nome: 'Camila Freitas', email: 'camila@email.com', telefone: '+55 47 9****-2020', status: 'pago', totalGasto: 1580, ultimaCompra: '14/08', origem: '@vendas_vip' },
  { id: 'c12', nome: 'Thiago Barros', email: 'thiago@email.com', telefone: '+55 62 9****-4545', status: 'novo', totalGasto: 0, ultimaCompra: '—', origem: 'Bio Link' },
]

export type Bot = {
  id: string
  nome: string
  handle: string
  status: StatusBot
  leads: number
  vendas: number
  faturamento: number
  gateway: string
}

export const bots: Bot[] = [
  { id: 'b1', nome: 'Vendas VIP', handle: '@vendas_vip', status: 'online', leads: 18240, vendas: 842, faturamento: 96430, gateway: 'BravoPay' },
  { id: 'b2', nome: 'Promo Express', handle: '@promo_bot', status: 'online', leads: 9820, vendas: 410, faturamento: 41200, gateway: 'PagStar' },
  { id: 'b3', nome: 'Mentoria Pro', handle: '@mentoria_pro', status: 'offline', leads: 4210, vendas: 96, faturamento: 47712, gateway: 'ZuxPay' },
  { id: 'b4', nome: 'Recuperação', handle: '@recovery_bot', status: 'online', leads: 6120, vendas: 188, faturamento: 18424, gateway: 'BravoPay' },
  { id: 'b5', nome: 'Combo Digital', handle: '@combo_bot', status: 'offline', leads: 2980, vendas: 54, faturamento: 7938, gateway: 'PagStar' },
  { id: 'b6', nome: 'Assinatura Club', handle: '@club_bot', status: 'online', leads: 7640, vendas: 512, faturamento: 15308, gateway: 'ZuxPay' },
]

export type Fluxo = {
  id: string
  nome: string
  status: StatusBot
  leads: number
  conversao: number
  gatilho: string
}

export const fluxos: Fluxo[] = [
  { id: 'f1', nome: 'Boas-vindas Premium', status: 'online', leads: 12480, conversao: 38.2, gatilho: 'Novo start' },
  { id: 'f2', nome: 'Recuperação de Carrinho', status: 'online', leads: 8210, conversao: 22.4, gatilho: 'Pix pendente' },
  { id: 'f3', nome: 'Upsell Order Bump', status: 'online', leads: 5430, conversao: 14.8, gatilho: 'Pagamento aprovado' },
  { id: 'f4', nome: 'Reativação 7 dias', status: 'offline', leads: 3120, conversao: 9.1, gatilho: 'Inatividade' },
]

export type Remarketing = {
  id: string
  nome: string
  status: StatusBot
  leads: number
  conversao: number
  canal: string
}

export const remarketing: Remarketing[] = [
  { id: 'r1', nome: 'Recuperação Pix', status: 'online', leads: 6420, conversao: 18.4, canal: 'WhatsApp' },
  { id: 'r2', nome: 'Reengajamento Lead', status: 'online', leads: 4310, conversao: 11.2, canal: 'Telegram' },
  { id: 'r3', nome: 'Carrinho Abandonado', status: 'offline', leads: 2890, conversao: 7.8, canal: 'Email' },
]

export type Postagem = {
  id: string
  nome: string
  status: StatusBot
  leads: number
  conversao: number
  rede: string
}

export const postagens: Postagem[] = [
  { id: 'p1', nome: 'Promo Sextou', status: 'online', leads: 9120, conversao: 24.6, rede: 'Instagram' },
  { id: 'p2', nome: 'Lançamento Combo', status: 'online', leads: 7430, conversao: 19.2, rede: 'Telegram' },
  { id: 'p3', nome: 'Flash Sale 24h', status: 'offline', leads: 5210, conversao: 15.1, rede: 'WhatsApp' },
]

export type AutomationCategory = 'bots' | 'fluxos' | 'remarketing' | 'postagens'

export type AutomationItem = {
  id: string
  category: AutomationCategory
  nome: string
  status: StatusBot
  leads: number
  conversao: number
  meta: string
}
