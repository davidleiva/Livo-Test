import { useState } from 'react'
import {
  CalendarDays, Briefcase, Search, BookOpen, UsersRound,
  Settings, LogOut, ChevronRight, Menu, CircleHelp, X,
  Moon, ShieldUser, User, OctagonAlert, Minus, Plus, Sparkles,
  Check, AlertTriangle,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PersonAvatar, WeeklyPlanPanel, MonthlyPlanPanel } from '../components/domain'
import ConsequenceLayer from '../components/domain/ConsequenceLayer'
import { mockIncident, mockOptions, mockWeeklyPlan, mockWeeklyPlanAna, mockMonthlyPlan } from '../data'
import type { WeeklyPlan } from '../types'

export interface Moment2LayoutProps {
  initialOptionId?: string
  onBack?: () => void
  onNavigateToM3?: () => void
}

// ── Chrome (mirrors LayoutDemo) ───────────────────────────────────────────────

const NAV_ITEMS: { id: string; label: string; icon: LucideIcon; active?: boolean }[] = [
  { id: 'incidencias',   label: 'Incidencias',   icon: OctagonAlert, active: true },
  { id: 'calendario',    label: 'Calendario',    icon: CalendarDays },
  { id: 'trabajo',       label: 'Trabajo',       icon: Briefcase },
  { id: 'ofertas',       label: 'Ofertas',       icon: Search },
  { id: 'documentacion', label: 'Documentación', icon: BookOpen },
  { id: 'personal',      label: 'Personal',      icon: UsersRound },
]

function LivoLogo({ className }: { className?: string }) {
  return <img src="/Livo_Logo.svg" alt="Livo" className={className} />
}

function NavItemButton({
  label, icon: Icon, active, onClick,
}: {
  label: string; icon: LucideIcon; active?: boolean; onClick?: () => void
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

function SidebarAction({ icon: Icon, label, onClick }: { icon: LucideIcon; label: string; onClick?: () => void }) {
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
      <img src="/avatars/juana-doe.png" alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-current" aria-hidden="true" />
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
          <NavItemButton key={id} label={label} icon={Icon} active={active} />
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

function HelpButton() {
  return (
    <button
      type="button"
      aria-label="Ayuda"
      onClick={() => console.log('ayuda')}
      className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-foreground-muted hover:text-foreground hover:bg-surface-alt transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
    >
      <CircleHelp size={22} strokeWidth={2} aria-hidden="true" />
    </button>
  )
}

function MobileTopBar({ isMenuOpen, onOpenMenu }: { isMenuOpen: boolean; onOpenMenu: () => void }) {
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

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
            <NavItemButton key={id} label={label} icon={Icon} active={active} onClick={onClose} />
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

// ── Design helpers ────────────────────────────────────────────────────────────

function StatPill({
  tone, icon: Icon = User, children,
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

function ShiftCard({
  accent, title, staffingTone, staffingLabel, reserveTone, reserveLabel,
}: {
  accent: 'danger' | 'success'
  title: string
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
          <span className="flex items-center gap-1 text-small text-foreground-muted mt-1">
            <Moon size={13} strokeWidth={2} aria-hidden="true" />
            Turno Noche · 22:00 - 06:00
          </span>
        </div>
        <div className="flex flex-wrap gap-2 md:justify-end flex-shrink-0">
          <StatPill tone={staffingTone}>{staffingLabel}</StatPill>
          <StatPill tone={reserveTone} icon={ShieldUser}>{reserveLabel}</StatPill>
        </div>
      </div>
    </div>
  )
}

function Avatar({
  initials, imageSrc, variant = 'neutral', badge, size = 'md',
}: {
  initials: string
  imageSrc?: string
  variant?: 'neutral' | 'mint'
  badge?: 'out' | 'in'
  size?: 'md' | 'sm'
}) {
  const dim      = size === 'md' ? 'w-12 h-12' : 'w-10 h-10'
  const tSize    = size === 'md' ? 'text-body-lg' : 'text-small'
  const badgeDim = size === 'md' ? 'w-[22px] h-[22px]' : 'w-[18px] h-[18px]'
  const badgeIcon = size === 'md' ? 10 : 8
  const bgCls = variant === 'mint' ? 'bg-mint-soft text-info' : 'bg-surface-alt text-foreground-muted'
  return (
    <div className="relative flex-shrink-0">
      <div className={`${dim} rounded-full flex items-center justify-center select-none overflow-hidden border-2 border-brand-teal/30 ${bgCls}`} aria-hidden="true">
        {imageSrc ? <img src={imageSrc} alt="" className="w-full h-full object-cover" /> : <span className={`${tSize} font-semibold`}>{initials}</span>}
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

function VerdictChip({ tone, label }: { tone: 'mint' | 'warning'; label: string }) {
  return tone === 'mint' ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label font-semibold whitespace-nowrap bg-mint-soft text-success border border-mint">
      <Sparkles size={10} strokeWidth={2} aria-hidden="true" />
      {label}
    </span>
  ) : (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label font-semibold whitespace-nowrap bg-warning-soft text-warning border border-warning-border">
      {label}
    </span>
  )
}

// ── Option data ───────────────────────────────────────────────────────────────

const inc        = mockIncident
const carmenData = mockOptions.find(o => o.id === 'opt-carmen')!
const anaData    = mockOptions.find(o => o.id === 'opt-ana')!
const splitData  = mockOptions.find(o => o.id === 'opt-split')!

interface OptionSpec {
  id: string
  name: string
  initials: string
  avatarSrc?: string
  avatarSrcs?: string[]
  verdictLabel: string
  verdictTone: 'mint' | 'warning'
  subtitle: string
  hoursLine: string
  rationale: string
  consequences: Array<{ timeframe: 'today' | 'week' | 'month'; text: string; tone: 'neutral' | 'success' | 'warning' | 'danger' }>
  legal: Array<{ ok: boolean; text: string }>
  shiftcard: { staffingTone: 'success' | 'danger'; reserveTone: 'warning' | 'neutral'; reserveLabel: string }
  weeklyPlan: WeeklyPlan
}

const OPTIONS: OptionSpec[] = [
  {
    id: 'opt-carmen',
    name: 'Carmen Ruiz',
    initials: 'CR',
    avatarSrc: carmenData.avatarSrc,
    verdictLabel: 'Recomendada',
    verdictTone: 'mint',
    subtitle: 'Enfermera UCI · Era la reserva',
    hoursLine: 'Horas acumuladas esta semana: 32h / 40h límite',
    rationale:
      'Carmen cumple todos los criterios sin coste adicional. El único impacto es consumir la única reserva disponible esta semana, dejando el plan frágil ante cualquier nuevo imprevisto. De las tres opciones, es la que genera menor deuda a corto y largo plazo.',
    consequences: [
      { timeframe: 'today', text: 'Turno cubierto 4/4. Sin coste.', tone: 'success' },
      { timeframe: 'week',  text: 'Reserva 1 → 0. La semana queda sin colchón.', tone: 'warning' },
      { timeframe: 'month', text: 'Impacto mínimo. Solo 1 día sin reserva de 22 laborables.', tone: 'success' },
    ],
    legal: [
      { ok: true,  text: 'Dentro de jornada contratada' },
      { ok: true,  text: 'Descanso mínimo respetado' },
      { ok: true,  text: 'Sin conflicto de convenio colectivo' },
    ],
    shiftcard: { staffingTone: 'success', reserveTone: 'warning', reserveLabel: 'Reserva: 0' },
    weeklyPlan: mockWeeklyPlan,
  },
  {
    id: 'opt-ana',
    name: 'Ana Torres',
    initials: 'AT',
    avatarSrc: anaData.avatarSrc,
    verdictLabel: 'Con coste',
    verdictTone: 'warning',
    subtitle: 'Enfermera UCI · +4h extra esta semana',
    hoursLine: 'Horas acumuladas esta semana: 40h / 40h · +4h extra',
    rationale:
      'Ana tiene la especialidad requerida y está disponible, pero ya ha completado su jornada semanal. Asignarle este turno genera 4 horas extra por encima del tope de convenio. Tiene derecho a rechazar la asignación con causa justificada, lo que reabriría la incidencia sin solución inmediata.',
    consequences: [
      { timeframe: 'today', text: 'Turno cubierto 4/4.', tone: 'success' },
      { timeframe: 'week',  text: '+4h extra. Supera el límite del convenio colectivo.', tone: 'danger' },
      { timeframe: 'month', text: 'Riesgo de rechazo por fatiga acumulada (Art. 34.8 ET).', tone: 'danger' },
    ],
    legal: [
      { ok: true,  text: 'Especialidad UCI correcta' },
      { ok: false, text: 'Supera la jornada semanal por convenio (+4h)' },
      { ok: false, text: 'Derecho a rechazo justificado (Art. 34.8 ET)' },
    ],
    shiftcard: { staffingTone: 'success', reserveTone: 'neutral', reserveLabel: 'Reserva: 1' },
    weeklyPlan: mockWeeklyPlanAna,
  },
  {
    id: 'opt-split',
    name: 'María L. + Sergio M.',
    initials: 'ML',
    avatarSrcs: splitData.avatarSrcs,
    verdictLabel: 'Deja frágil',
    verdictTone: 'warning',
    subtitle: 'Turno dividido · Dos profesionales',
    hoursLine: 'Horas: María 36h / 40h · Sergio 34h / 40h',
    rationale:
      'La combinación cubre las horas sin superar la jornada individual de ninguno de los dos. El riesgo está en la doble dependencia: si cualquiera de ellos rechaza la asignación, el turno queda descubierto y la incidencia se reabre sin solución inmediata disponible.',
    consequences: [
      { timeframe: 'today', text: 'Turno cubierto solo si ambos aceptan.', tone: 'warning' },
      { timeframe: 'week',  text: 'Reserva 1 → 0. Plan frágil.', tone: 'warning' },
      { timeframe: 'month', text: 'Riesgo de no-cobertura si uno rechaza (doble aceptación requerida).', tone: 'warning' },
    ],
    legal: [
      { ok: true,  text: 'Jornada individual respetada' },
      { ok: true,  text: 'Descanso mínimo respetado' },
      { ok: false, text: 'Requiere 2 aceptaciones: si una falla, turno descubierto' },
    ],
    shiftcard: { staffingTone: 'success', reserveTone: 'warning', reserveLabel: 'Reserva: 0' },
    weeklyPlan: mockWeeklyPlan,
  },
]

// ── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-label font-semibold uppercase tracking-wide text-foreground-subtle">
      {children}
    </p>
  )
}

function IncidentContextStrip() {
  return (
    <div className="rounded-xl border border-card-border border-l-[6px] border-l-danger-border bg-surface px-4 py-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-bg px-2.5 py-1 text-small font-medium text-danger">
              <OctagonAlert size={13} strokeWidth={2} aria-hidden="true" />
              Criticidad alta
            </span>
            <span className="text-body font-semibold text-foreground">
              Baja médica: {inc.nurseName}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-small text-foreground-muted">
            <Moon size={13} strokeWidth={2} className="text-foreground-subtle flex-shrink-0" aria-hidden="true" />
            <span className="truncate">
              Turno Noche · {inc.startTime} - {inc.endTime} · <span className="text-danger">Faltan {inc.startsInHours}h</span>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          <StatPill tone="danger" icon={User}>Personal: {inc.currentStaff}/{inc.unitMinStaff}</StatPill>
          <StatPill tone="neutral" icon={ShieldUser}>Reserva: {inc.reserve}</StatPill>
        </div>
      </div>
    </div>
  )
}

// ── Option list (desktop sidebar) ─────────────────────────────────────────────

function OptionListItem({
  opt, selected, onClick,
}: {
  opt: OptionSpec
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full flex items-start gap-3 px-4 py-4 border-l-[3px] transition-colors text-left focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-mint',
        selected
          ? 'bg-surface-alt border-active-border'
          : 'bg-surface border-transparent hover:bg-surface-alt',
      ].join(' ')}
    >
      {opt.avatarSrcs ? (
        <PersonAvatar
          badge="in"
          people={[
            { initials: 'ML', imageSrc: opt.avatarSrcs[0] },
            { initials: 'SM', imageSrc: opt.avatarSrcs[1] },
          ]}
        />
      ) : (
        <Avatar initials={opt.initials} imageSrc={opt.avatarSrc} size="sm" badge="in" />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-body font-semibold text-foreground leading-tight">{opt.name}</p>
        <p className="text-small text-foreground-muted mt-0.5">{opt.subtitle}</p>
        <div className="mt-2">
          <VerdictChip tone={opt.verdictTone} label={opt.verdictLabel} />
        </div>
      </div>
    </button>
  )
}

// ── Detail panel ─────────────────────────────────────────────────────────────

function OptionDetail({ opt, onNavigateToM3 }: { opt: OptionSpec; onNavigateToM3?: () => void }) {
  return (
    <div className="space-y-5">

      {/* 1 ── Agent heading + projected shift */}
      <div className="space-y-3">
        <div className="flex items-start gap-2.5">
          <Sparkles size={18} strokeWidth={1.75} className="text-mint flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-body font-semibold text-foreground leading-snug">
              Si se elige esta opción
            </p>
            <p className="text-small text-foreground-muted mt-0.5">
              Estado resultante del turno tras la asignación
            </p>
          </div>
        </div>
        <ShiftCard
          accent="success"
          title={`${inc.unit} · Hospital Clínico (Valencia)`}
          staffingTone={opt.shiftcard.staffingTone}
          staffingLabel={`Personal: ${inc.unitMinStaff} / ${inc.unitMinStaff}`}
          reserveTone={opt.shiftcard.reserveTone}
          reserveLabel={opt.shiftcard.reserveLabel}
        />
      </div>

      <div className="border-t border-dashed border-line" />

      {/* 2 ── Person */}
      <div className={`flex items-start ${opt.avatarSrcs ? 'gap-5 pl-4' : 'gap-3'}`}>
        {opt.avatarSrcs ? (
          <PersonAvatar
            size="lg"
            badge="in"
            people={[
              { initials: 'ML', imageSrc: opt.avatarSrcs[0] },
              { initials: 'SM', imageSrc: opt.avatarSrcs[1] },
            ]}
          />
        ) : (
          <Avatar initials={opt.initials} imageSrc={opt.avatarSrc} variant="mint" badge="in" />
        )}
        <div className="min-w-0 pt-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-title font-semibold text-foreground leading-tight">{opt.name}</span>
            <VerdictChip tone={opt.verdictTone} label={opt.verdictLabel} />
          </div>
          <p className="text-small text-foreground-muted mt-0.5">{opt.subtitle}</p>
          <p className="text-small text-foreground-subtle mt-0.5">{opt.hoursLine}</p>
        </div>
      </div>

      <div className="border-t border-dashed border-line" />

      {/* 3 ── Agent rationale */}
      <div className="space-y-1.5">
        <SectionLabel>Por qué esta opción</SectionLabel>
        <p className="text-body text-foreground-muted leading-relaxed">{opt.rationale}</p>
      </div>

      <div className="border-t border-dashed border-line" />

      {/* 4 ── Consequences */}
      <div className="space-y-1.5">
        <SectionLabel>Consecuencias</SectionLabel>
        <div>
          {opt.consequences.map(c => (
            <ConsequenceLayer key={c.timeframe} layer={c} />
          ))}
        </div>
      </div>

      <div className="border-t border-dashed border-line" />

      {/* 5 ── Legal */}
      <div className="space-y-2">
        <SectionLabel>Viabilidad legal</SectionLabel>
        <div className="space-y-1.5">
          {opt.legal.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              {item.ok ? (
                <Check size={14} strokeWidth={2.5} className="text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
              ) : (
                <AlertTriangle size={14} strokeWidth={2} className="text-warning flex-shrink-0 mt-0.5" aria-hidden="true" />
              )}
              <span className={`text-body leading-snug ${item.ok ? 'text-foreground-muted' : 'text-warning'}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-dashed border-line" />

      {/* 6 ── Actions */}
      <div className="space-y-3 pb-2">
        <div className="space-y-3 lg:hidden">
          <button
            type="button"
            onClick={() => onNavigateToM3?.()}
            className="w-full inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-body font-medium bg-brand-teal text-white hover:bg-brand-teal-hover transition-colors cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
          >
            Validar {opt.name}
          </button>
          <button
            type="button"
            onClick={() => console.log('escalar')}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-body font-medium border border-brand-teal text-brand-teal hover:bg-surface-alt transition-colors cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
          >
            Escalar
          </button>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <button
            type="button"
            onClick={() => onNavigateToM3?.()}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-body font-medium bg-brand-teal text-white hover:bg-brand-teal-hover transition-colors cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
          >
            Validar {opt.name}
          </button>
          <button
            type="button"
            onClick={() => console.log('escalar')}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-body font-medium border border-brand-teal text-brand-teal hover:bg-surface-alt transition-colors cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
          >
            Escalar
          </button>
        </div>
        {opt.id === 'opt-ana' && (
          <div className="flex items-center gap-2 px-3 py-2.5 bg-warning-soft border border-warning-border rounded-lg lg:w-fit">
            <AlertTriangle size={14} strokeWidth={2} className="text-warning flex-shrink-0" aria-hidden="true" />
            <p className="text-small text-warning leading-snug">
              Esta opción tiene riesgo legal: Ana puede rechazar con causa justificada.
            </p>
          </div>
        )}
      </div>

    </div>
  )
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function Moment2Layout({ initialOptionId = 'opt-carmen', onBack, onNavigateToM3 }: Moment2LayoutProps) {
  const [selectedId, setSelectedId]       = useState(initialOptionId)
  const [isMobileMenuOpen, setMobileMenu] = useState(false)

  const selected = OPTIONS.find(o => o.id === selectedId) ?? OPTIONS[0]

  return (
    <div className="flex h-svh overflow-hidden bg-surface-alt">

      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <MobileTopBar
          isMenuOpen={isMobileMenuOpen}
          onOpenMenu={() => setMobileMenu(true)}
        />
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setMobileMenu(false)}
        />

        {/* Breadcrumb */}
        <div className="flex-shrink-0 bg-surface border-b border-line px-4 py-2 md:px-6 md:flex md:items-center md:justify-between md:gap-4">
          <nav aria-label="Ruta de navegación" className="flex min-w-0 items-center gap-1">
            <button
              type="button"
              onClick={onBack}
              className="text-small text-info hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm"
            >
              Incidencias
            </button>
            <ChevronRight size={12} strokeWidth={2} className="text-foreground-subtle flex-shrink-0" aria-hidden="true" />
            <button
              type="button"
              onClick={onBack}
              className="text-small text-info hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm"
            >
              Baja médica: Laura García
            </button>
            <ChevronRight size={12} strokeWidth={2} className="text-foreground-subtle flex-shrink-0" aria-hidden="true" />
            <span className="text-small text-foreground-muted truncate">Comparar opciones</span>
          </nav>
          <div className="hidden md:block ml-auto">
            <HelpButton />
          </div>
        </div>

        {/* Content: option list + detail */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

          {/* Option list — desktop only */}
          <div className="hidden lg:flex flex-col w-72 xl:w-80 flex-shrink-0 overflow-y-auto bg-surface">
            <div className="px-4 pt-4 pb-2">
              <p className="text-label font-semibold uppercase tracking-wide text-foreground-subtle">Soluciones viables</p>
            </div>
            {OPTIONS.map(opt => (
              <OptionListItem
                key={opt.id}
                opt={opt}
                selected={selectedId === opt.id}
                onClick={() => setSelectedId(opt.id)}
              />
            ))}
          </div>

          {/* Detail scroll area */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-4 md:px-6 md:py-6 lg:flex lg:gap-6 lg:items-start">

              {/* Detail content + actions */}
              <div className="lg:flex-1 min-w-0 space-y-5">
                <IncidentContextStrip />

                {/* Option pills — mobile/tablet only */}
                <div className="lg:hidden space-y-2">
                  <SectionLabel>Soluciones viables</SectionLabel>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {OPTIONS.map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedId(opt.id)}
                        className={[
                          'px-3 py-1.5 rounded-full text-small font-medium whitespace-nowrap flex-shrink-0 border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint',
                          selectedId === opt.id
                            ? 'bg-brand-teal text-white border-brand-teal'
                            : 'bg-surface text-foreground-muted border-line hover:border-foreground-subtle hover:text-foreground',
                        ].join(' ')}
                      >
                        {opt.name}
                      </button>
                    ))}
                  </div>
                </div>

                <OptionDetail opt={selected} onNavigateToM3={onNavigateToM3} />
              </div>

              {/* Mobile divider */}
              <div className="mt-4 border-t border-dashed border-line lg:hidden" />

              {/* Weekly + monthly plan — sticky on desktop, stacked on mobile */}
              <div className="mt-4 lg:mt-0 lg:w-[360px] lg:flex-shrink-0 lg:sticky lg:top-0 space-y-4">
                <WeeklyPlanPanel {...selected.weeklyPlan} />
                <MonthlyPlanPanel {...mockMonthlyPlan} />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
