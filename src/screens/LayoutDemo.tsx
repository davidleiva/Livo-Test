import { useState } from 'react'
import {
  CalendarDays, Briefcase, Search, BookOpen, UsersRound,
  Settings, LogOut, ChevronRight, Menu, CircleHelp, X,
  Moon, Clock, Stethoscope, ShieldAlert, ShieldUser, OctagonAlert, Minus, Plus, User, Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PersonAvatar, WeeklyPlanPanel, MonthlyPlanPanel } from '../components/domain'
import { mockIncident, mockOptions, mockWeeklyPlan, mockMonthlyPlan } from '../data'

export interface LayoutDemoProps {
  onNavigateToM2?: (optionId: string) => void
  onNavigateToM3?: () => void
}

// ── Sidebar (unchanged) ───────────────────────────────────────────────────────

const NAV_ITEMS: { id: string; label: string; icon: LucideIcon; active?: boolean }[] = [
  { id: 'incidencias',   label: 'Incidencias',   icon: OctagonAlert, active: true },
  { id: 'calendario',    label: 'Calendario',    icon: CalendarDays },
  { id: 'trabajo',       label: 'Trabajo',       icon: Briefcase },
  { id: 'ofertas',       label: 'Ofertas',       icon: Search    },
  { id: 'documentacion', label: 'Documentación', icon: BookOpen  },
  { id: 'personal',      label: 'Personal',      icon: UsersRound },
]

function LivoLogo({ className }: { className?: string }) {
  return (
    <img
      src="/Livo_Logo.svg"
      alt="Livo"
      className={className}
    />
  )
}

function NavItemButton({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string
  icon: LucideIcon
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
      className={[
        'group relative w-full flex items-center gap-5 rounded-xl px-4 py-3 text-[14px] font-medium leading-none',
        'transition-colors text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint',
        active
          ? 'bg-[#D6FFFF] text-brand-teal'
          : 'text-[#B7DCE2] hover:text-[#D6FFFF] hover:bg-white/[0.05]',
      ].join(' ')}
    >
      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center" aria-hidden="true">
        <Icon size={20} strokeWidth={2.25} />
      </span>
      <span className="truncate">{label}</span>
    </button>
  )
}

function SidebarAction({
  icon: Icon,
  label,
  onClick,
}: {
  icon: LucideIcon
  label: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-5 rounded-xl px-4 py-3 text-[14px] font-medium leading-none text-[#B7DCE2] hover:text-[#D6FFFF] hover:bg-white/[0.05] transition-colors text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
    >
      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center" aria-hidden="true">
        <Icon size={20} strokeWidth={2.25} />
      </span>
      <span className="truncate">{label}</span>
    </button>
  )
}

function SidebarUser() {
  return (
    <button
      type="button"
      className="w-full flex items-center gap-4 rounded-xl px-4 py-3 text-left text-[#B7DCE2] hover:text-[#D6FFFF] hover:bg-white/[0.05] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
    >
      <img
        src="/avatars/juana-doe.png"
        alt=""
        className="h-10 w-10 rounded-full object-cover ring-2 ring-current"
        aria-hidden="true"
      />
      <span className="min-w-0 flex-1 truncate text-[14px] font-medium leading-none">Juana Doe</span>
      <ChevronRight size={20} strokeWidth={2.25} className="flex-shrink-0" aria-hidden="true" />
    </button>
  )
}

function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-[258px] flex-shrink-0 bg-brand-teal px-4 py-7">
      <div className="px-4 pb-9">
        <LivoLogo className="h-7 w-auto" />
      </div>

      <nav className="space-y-5" aria-label="Navegación principal">
        {NAV_ITEMS.map(({ id, label, icon: Icon, active }) => (
          <NavItemButton
            key={id}
            label={label}
            icon={Icon}
            active={active}
          />
        ))}
      </nav>

      <div className="mt-auto space-y-4 pb-1">
        <SidebarUser />
        <div className="space-y-4">
          <SidebarAction icon={Settings} label="Configuración" />
          <SidebarAction icon={LogOut} label="Cerrar sesión" />
        </div>
      </div>
    </aside>
  )
}

function HelpButton({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      aria-label="Ayuda"
      onClick={() => console.log('ayuda')}
      className={[
        'inline-flex items-center justify-center w-10 h-10 rounded-xl',
        'text-foreground-muted hover:text-foreground hover:bg-surface-alt transition-colors cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1',
        className,
      ].join(' ')}
    >
      <CircleHelp size={22} strokeWidth={2} aria-hidden="true" />
    </button>
  )
}

function MobileTopBar({
  isMenuOpen,
  onOpenMenu,
}: {
  isMenuOpen: boolean
  onOpenMenu: () => void
}) {
  return (
    <header className="sticky top-0 z-30 md:hidden flex-shrink-0 bg-surface/95 backdrop-blur border-b border-line">
      <div className="relative flex items-center justify-between min-h-15 px-3">
        <button
          type="button"
          aria-label="Abrir menú principal"
          aria-expanded={isMenuOpen}
          onClick={onOpenMenu}
          className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-foreground-muted hover:text-foreground hover:bg-surface-alt transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
        >
          <Menu size={22} strokeWidth={2} aria-hidden="true" />
        </button>

        <LivoLogo className="absolute left-1/2 h-6 w-auto -translate-x-1/2" />

        <HelpButton />
      </div>
    </header>
  )
}

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <div
      className={[
        'fixed inset-0 z-50 md:hidden transition-opacity duration-200 ease-out',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      ].join(' ')}
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal"
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Cerrar menú principal"
        className="absolute inset-0 bg-black/35 cursor-default"
        onClick={onClose}
      />

      <aside
        className={[
          'relative flex h-full w-[86vw] max-w-80 flex-col bg-brand-teal px-4 py-7 shadow-xl',
          'transition-transform duration-200 ease-out will-change-transform',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="flex items-center justify-between px-4 pb-9">
          <LivoLogo className="h-7 w-auto" />
          <button
            type="button"
            aria-label="Cerrar menú principal"
            onClick={onClose}
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-white/65 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
          >
            <X size={20} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <nav className="space-y-5" aria-label="Navegación principal">
          {NAV_ITEMS.map(({ id, label, icon: Icon, active }) => (
            <NavItemButton
              key={id}
              label={label}
              icon={Icon}
              active={active}
              onClick={onClose}
            />
          ))}
        </nav>

        <div className="mt-auto space-y-4 pb-1">
          <SidebarUser />
          <div className="space-y-4">
            <SidebarAction icon={Settings} label="Configuración" onClick={onClose} />
            <SidebarAction icon={LogOut} label="Cerrar sesión" onClick={onClose} />
          </div>
        </div>
      </aside>
    </div>
  )
}

// ── Design-system helpers (local to this screen) ──────────────────────────────

// Pill with user-round icon — danger / success / warning / neutral-gray
function StatPill({
  tone,
  icon: Icon = User,
  children,
}: {
  tone: 'danger' | 'success' | 'warning' | 'neutral'
  icon?: LucideIcon
  children: React.ReactNode
}) {
  const cls = {
    danger:  'bg-danger-bg  text-danger',
    success: 'bg-success-bg text-success',
    warning: 'bg-warning-bg text-warning',
    neutral: 'bg-[#ededed]  text-foreground-muted',
  }[tone]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-small font-medium whitespace-nowrap ${cls}`}>
      <Icon size={12} strokeWidth={2} aria-hidden="true" className={tone === 'neutral' ? '[stroke-dasharray:2.5_1.5]' : undefined} />
      {children}
    </span>
  )
}

// Attribute chip: success (green) — for Carmen's traits
function TraitChip({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-small font-medium whitespace-nowrap bg-success-bg text-success">
      <Icon size={12} strokeWidth={2} aria-hidden="true" />
      {children}
    </span>
  )
}

// Attribute chip: warning (amber) with user icon — for option-row costs
function CostChip({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-small font-medium whitespace-nowrap bg-warning-bg text-warning">
      <Icon size={12} strokeWidth={2} aria-hidden="true" />
      {children}
    </span>
  )
}

// Circular avatar with optional status badge
function Avatar({
  initials,
  imageSrc,
  variant = 'neutral',
  badge,
  size = 'md',
}: {
  initials: string
  imageSrc?: string
  variant?: 'neutral' | 'mint'
  badge?: 'out' | 'in'
  size?: 'md' | 'sm'
}) {
  const dim    = size === 'md' ? 'w-12 h-12' : 'w-10 h-10'
  const tSize  = size === 'md' ? 'text-body-lg' : 'text-small'
  const badgeDim = size === 'md' ? 'w-[22px] h-[22px]' : 'w-[18px] h-[18px]'
  const badgeIcon = size === 'md' ? 10 : 8
  const bgCls  = variant === 'mint'
    ? 'bg-mint-soft text-info'
    : 'bg-surface-alt text-foreground-muted'

  return (
    <div className="relative flex-shrink-0">
      <div
        className={`${dim} rounded-full flex items-center justify-center select-none overflow-hidden border-2 border-brand-teal/30 ${bgCls}`}
        aria-hidden="true"
      >
        {imageSrc ? (
          <img src={imageSrc} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className={`${tSize} font-semibold`}>{initials}</span>
        )}
      </div>
      {badge === 'out' && (
        <div className={`absolute -bottom-0.5 -right-0.5 ${badgeDim} rounded-full bg-foreground-subtle border-2 border-surface flex items-center justify-center`} aria-hidden="true">
          <Minus size={badgeIcon + 1} strokeWidth={3} className="text-white" />
        </div>
      )}
      {badge === 'in' && (
        <div className={`absolute -bottom-0.5 -right-0.5 ${badgeDim} rounded-full bg-mint border-2 border-surface flex items-center justify-center`} aria-hidden="true">
          <Plus size={badgeIcon} strokeWidth={2.5} className="text-white" />
        </div>
      )}
    </div>
  )
}

// Shift card with thick left border — replaces the colored-bar-div pattern
function ShiftCard({
  accent,
  title,
  faltan,
  staffingTone,
  staffingLabel,
  reserveTone,
  reserveLabel,
}: {
  accent: 'danger' | 'success'
  title: string
  faltan?: string
  staffingTone: 'danger' | 'success'
  staffingLabel: string
  reserveTone: 'warning' | 'neutral'
  reserveLabel: string
}) {
  const borderCls = accent === 'danger'
    ? 'border border-danger-border border-l-[6px]'
    : 'border border-success-border border-l-[6px]'

  return (
    <div className={`px-4 py-3 rounded-2xl bg-surface ${borderCls}`}>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="text-body font-semibold text-foreground leading-tight">{title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1 text-small text-foreground-muted">
              <Moon size={13} strokeWidth={2} aria-hidden="true" />
              Turno Noche · 22:00 - 06:00
              {faltan && (
                <> · <span className="text-danger">{faltan}</span></>
              )}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 md:justify-end flex-shrink-0">
          <StatPill tone={staffingTone}>{staffingLabel}</StatPill>
          <StatPill tone={reserveTone} icon={ShieldUser}>{reserveLabel}</StatPill>
        </div>
      </div>
    </div>
  )
}

// ── Content ───────────────────────────────────────────────────────────────────

const inc         = mockIncident
const agentChoice = mockOptions.find((o) => o.isAgentChoice)!
const anaOption   = mockOptions.find((o) => o.id === 'opt-ana')!
const splitOption = mockOptions.find((o) => o.id === 'opt-split')!

function IncidentContent({ onNavigateToM2, onNavigateToM3 }: Pick<LayoutDemoProps, 'onNavigateToM2' | 'onNavigateToM3'>) {
  return (
    <div className="space-y-4">

      {/* 1 ── Incident card */}
      <div className="border border-card-border rounded-2xl p-5 space-y-4 bg-surface">

        {/* Header: avatar + name + meta */}
        <div className="flex items-start gap-3">
          <Avatar initials="LG" imageSrc={inc.avatarSrc} badge="out" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex items-start justify-between gap-4">
              <p className="text-[22px] font-medium text-foreground leading-tight">
                Baja médica: Laura García
              </p>
              <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                <span className="text-small text-foreground-muted whitespace-nowrap">Hoy. 17:55h</span>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-danger-bg text-danger text-small font-medium">
                  <OctagonAlert size={14} strokeWidth={2} aria-hidden="true" />
                  Crítica
                </div>
              </div>
            </div>
            <p className="text-small text-foreground-muted mt-1">
              Hoy no podrá cubrir: {inc.unit} - Turno Noche
            </p>
            <div className="flex items-center gap-2 mt-2 md:hidden">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-danger-bg text-danger text-small font-medium">
                <OctagonAlert size={14} strokeWidth={2} aria-hidden="true" />
                Crítica
              </div>
              <span className="text-small text-foreground-muted whitespace-nowrap">Hoy. 17:55h</span>
            </div>
          </div>
        </div>

        {/* Shift state — current, critical */}
        <ShiftCard
          accent="danger"
          title={`${inc.unit} · Hospital Clínico (Valencia)`}
          faltan={`Faltan ${inc.startsInHours}h`}
          staffingTone="danger"
          staffingLabel={`Personal: ${inc.currentStaff} / ${inc.unitMinStaff}`}
          reserveTone="neutral"
          reserveLabel={`Reserva: ${inc.reserve}`}
        />

        {/* Staffing deficit alert */}
        <div className="flex items-start gap-2.5 px-4 py-3.5 bg-danger-bg border border-danger-border rounded-2xl">
          <OctagonAlert size={18} strokeWidth={2} className="text-danger flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-body font-semibold text-danger">Falta 1 Profesional</p>
            <p className="text-small text-danger mt-1">
              {inc.currentStaff} de {inc.unitMinStaff} en este turno. Por debajo del mínimo requerido.
            </p>
          </div>
        </div>

      </div>

      {/* Dashed divider between problem and solution */}
      <div className="border-t border-dashed border-line" />

      {/* 2 ── Agent block */}
      <div className="flex items-start gap-3">
        <Sparkles size={22} strokeWidth={1.75} className="text-mint flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="text-body-lg font-semibold text-foreground leading-snug">
            Mejor solución encontrada
          </p>
          <p className="text-small text-foreground-muted mt-0.5">
            Cubre el turno, pero consume la reserva del plan semanal.
          </p>
        </div>
      </div>

      {/* 3 ── Solution card */}
      <div className="border border-card-border rounded-2xl p-5 space-y-4 bg-surface">

        {/* Projected shift — green accent, full staffing, reserve amber */}
        <ShiftCard
          accent="success"
          title={`${inc.unit} · Hospital Clínico (Valencia)`}
          staffingTone="success"
          staffingLabel={`Personal: ${inc.unitMinStaff} / ${inc.unitMinStaff}`}
          reserveTone="warning"
          reserveLabel="Reserva: 0"
        />

        {/* Assigned professional */}
        <div className="flex items-start gap-3">
          <Avatar initials="CR" imageSrc={agentChoice.avatarSrc} variant="mint" badge="in" />
          <div className="min-w-0 pt-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[22px] font-medium text-foreground leading-tight">
                {agentChoice.nurseName}
              </span>
              <div className="hidden md:flex gap-2 flex-wrap">
                <TraitChip icon={Clock}>No añade horas extra</TraitChip>
                <TraitChip icon={Stethoscope}>Tiene la especialidad</TraitChip>
              </div>
            </div>
            <p className="text-small text-foreground-muted mt-1">
              Enfermera {inc.unit} · Era la reserva
            </p>
            <div className="flex gap-2 flex-wrap mt-2 md:hidden">
              <TraitChip icon={Clock}>No añade horas extra</TraitChip>
              <TraitChip icon={Stethoscope}>Tiene la especialidad</TraitChip>
            </div>
          </div>
        </div>

        {/* Fragile plan warning */}
        <div className="flex items-start gap-2.5 px-4 py-3.5 bg-warning-bg border border-warning-border rounded-2xl">
          <ShieldAlert size={18} strokeWidth={2} className="text-warning flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-body font-semibold text-warning">El plan semanal queda frágil</p>
            <p className="text-small text-warning mt-1">
              Sin reserva. Si falla más esta semana, no tendríamos margen.
            </p>
          </div>
        </div>

        <div className="border-t border-dashed border-line" />

        {/* Decision actions */}
        <div className="space-y-3 lg:hidden">
          <button
            type="button"
            onClick={() => onNavigateToM3?.()}
            className="w-full inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-body font-medium bg-brand-teal text-white hover:bg-brand-teal-hover transition-colors cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
          >
            Validar
          </button>
          <button
            type="button"
            onClick={() => onNavigateToM2?.('opt-carmen')}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-body font-medium border border-brand-teal text-brand-teal hover:bg-surface-alt transition-colors cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
          >
            Ver detalles
          </button>
          <button
            type="button"
            onClick={() => console.log('escalar')}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-body font-medium border border-brand-teal text-brand-teal hover:bg-surface-alt transition-colors cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
          >
            Escalar
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigateToM3?.()}
            className="flex-[2] inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-body font-medium bg-brand-teal text-white hover:bg-brand-teal-hover transition-colors cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
          >
            Validar
          </button>
          <button
            type="button"
            onClick={() => onNavigateToM2?.('opt-carmen')}
            className="flex-1 inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-body font-medium border border-brand-teal text-brand-teal hover:bg-surface-alt transition-colors cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
          >
            Ver detalles
          </button>
          <button
            type="button"
            onClick={() => console.log('escalar')}
            className="flex-1 inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-body font-medium border border-brand-teal text-brand-teal hover:bg-surface-alt transition-colors cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
          >
            Escalar
          </button>
        </div>

      </div>

      {/* 4 ── Other viable options */}
      <div className="space-y-3">
        <p className="text-body-lg font-semibold text-foreground">Otras soluciones viables</p>

        {/* Ana Torres */}
        <button
          type="button"
          onClick={() => onNavigateToM2?.('opt-ana')}
          className="w-full flex items-center gap-4 px-4 py-3 bg-surface border border-card-border rounded-2xl hover:border-foreground-subtle transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint cursor-pointer"
        >
          <Avatar initials="AT" imageSrc={anaOption.avatarSrc} size="sm" badge="in" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-title-lg font-medium text-foreground leading-tight">Ana Torres</span>
              <CostChip icon={Clock}>Con coste</CostChip>
            </div>
            <p className="text-small text-foreground-muted mt-0.5">Enfermera UCI · +4h esta semana</p>
          </div>
          <ChevronRight size={18} strokeWidth={2} className="text-foreground-subtle flex-shrink-0" aria-hidden="true" />
        </button>

        {/* Split shift: María López + Sergio Martínez */}
        <button
          type="button"
          onClick={() => onNavigateToM2?.('opt-split')}
          className="w-full flex items-center gap-4 px-4 py-3 bg-surface border border-card-border rounded-2xl hover:border-foreground-subtle transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint cursor-pointer"
        >
          <PersonAvatar
            badge="in"
            people={[
              { initials: 'ML', imageSrc: splitOption.avatarSrcs?.[0] },
              { initials: 'SM', imageSrc: splitOption.avatarSrcs?.[1] },
            ]}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-title-lg font-medium text-foreground leading-tight">
                María López + Sergio Martínez
              </span>
              <CostChip icon={ShieldAlert}>Deja frágil</CostChip>
            </div>
            <p className="text-small text-foreground-muted mt-0.5">Turno dividido</p>
          </div>
          <ChevronRight size={18} strokeWidth={2} className="text-foreground-subtle flex-shrink-0" aria-hidden="true" />
        </button>

      </div>
    </div>
  )
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function LayoutDemo({ onNavigateToM2, onNavigateToM3 }: LayoutDemoProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-svh overflow-hidden bg-surface-alt">

      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <MobileTopBar
          isMenuOpen={isMobileMenuOpen}
          onOpenMenu={() => setIsMobileMenuOpen(true)}
        />

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Breadcrumb */}
        <div className="flex-shrink-0 bg-surface border-b border-line px-4 py-2 md:px-6 md:flex md:items-center md:justify-between md:gap-4">
          <nav aria-label="Ruta de navegación" className="flex min-w-0 items-center gap-1">
            <span className="text-small text-info hover:underline cursor-pointer">Incidencias</span>
            <ChevronRight size={12} strokeWidth={2} className="text-foreground-subtle flex-shrink-0" aria-hidden="true" />
            <span className="text-small text-foreground-muted truncate">Baja médica: Laura García</span>
          </nav>
          <div className="hidden md:block ml-auto">
            <HelpButton />
          </div>
        </div>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
          <div className="mx-auto max-w-2xl lg:max-w-[1080px] lg:flex lg:gap-6 lg:items-start">

            {/* Left — primary decision flow */}
            <div className="min-w-0 lg:flex-[1.7]">
              <IncidentContent onNavigateToM2={onNavigateToM2} onNavigateToM3={onNavigateToM3} />
            </div>

            {/* Divider — only visible when stacked on mobile/tablet */}
            <div className="mt-4 border-t border-dashed border-line lg:hidden" />

            {/* Right — weekly + monthly plan context */}
            {/* Mobile: stacks below; Desktop: sticky while left column scrolls */}
            <div className="mt-4 lg:mt-0 lg:flex-1 lg:sticky lg:top-0 space-y-4">
              <WeeklyPlanPanel {...mockWeeklyPlan} />
              <MonthlyPlanPanel {...mockMonthlyPlan} />
            </div>

          </div>
        </main>

      </div>
    </div>
  )
}
