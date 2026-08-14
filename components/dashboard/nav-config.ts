import {
  LayoutDashboard,
  Trophy,
  Award,
  LineChart,
  Wallet,
  Users,
  MessagesSquare,
  Bot,
  Workflow,
  Send,
  Megaphone,
  Plug,
  Radar,
  Link2,
  type LucideIcon,
} from 'lucide-react'

export type PageKey =
  | 'dashboard'
  | 'ranking'
  | 'premiacoes'
  | 'analises'
  | 'financeiro'
  | 'clientes'
  | 'comunidade'
  | 'automacoes'
  | 'gateways'
  | 'trackeamento'
  | 'biolink'

export type NavItem = {
  key: PageKey
  label: string
  icon: LucideIcon
}

export type NavGroup = {
  label: string
  items: NavItem[]
  /** Adiciona um separador (border-t) acima do grupo para um respiro visual final */
  topSeparator?: boolean
}

export const navGroups: NavGroup[] = [
  {
    label: 'Principal',
    items: [
      { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { key: 'analises', label: 'Análises', icon: LineChart },
    ],
  },
  {
    label: 'Operação',
    items: [
      { key: 'financeiro', label: 'Financeiro', icon: Wallet },
      { key: 'clientes', label: 'Clientes', icon: Users },
      { key: 'comunidade', label: 'Comunidade', icon: MessagesSquare },
    ],
  },
  {
    label: 'Automações',
    items: [
      { key: 'automacoes', label: 'Central de Automação', icon: Bot },
    ],
  },
  {
    label: 'Integrações',
    items: [
      { key: 'gateways', label: 'Gateways', icon: Plug },
      { key: 'trackeamento', label: 'Trackeamento', icon: Radar },
      { key: 'biolink', label: 'Bio Link', icon: Link2 },
    ],
  },
  {
    label: 'Estratégico',
    topSeparator: true,
    items: [
      { key: 'ranking', label: 'Ranking', icon: Trophy },
      { key: 'premiacoes', label: 'Premiações', icon: Award },
    ],
  },
]

export const pageTitles: Record<PageKey, string> = {
  dashboard: 'Dashboard',
  ranking: 'Ranking',
  premiacoes: 'Premiações',
  analises: 'Análises',
  financeiro: 'Financeiro',
  clientes: 'Base de Clientes',
  comunidade: 'Comunidade',
  automacoes: 'Central de Automação',
  gateways: 'Gateways de Pagamento',
  trackeamento: 'Trackeamento',
  biolink: 'Bio Link',
}
