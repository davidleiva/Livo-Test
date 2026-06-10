import { useState } from 'react'
import {
  CalendarDays, Briefcase, Search, BookOpen, UsersRound,
  Settings, LogOut, ChevronRight, Menu, CircleHelp, X,
  Moon, ShieldUser, OctagonAlert,
  CheckCircle, Clock, RotateCcw, Bell,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { WeeklyPlanPanel, MonthlyPlanPanel } from '../components/domain'
import { mockIncident, mockOptions, mockWeeklyPlanConfirmed, mockMonthlyPlan } from '../data'

export interface Moment3LayoutProps {
  onGoToIncidencias?: () => void
}

// ── Chrome (same as LayoutDemo / M2Layout) ────────────────────────────────────

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
  tone, icon: Icon = ShieldUser, children,
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
  initials, imageSrc, variant = 'neutral', state,
}: {
  initials: string
  imageSrc?: string
  variant?: 'neutral' | 'mint'
  state?: 'pending'
}) {
  const bgCls = variant === 'mint' ? 'bg-mint-soft text-success' : 'bg-surface-alt text-foreground-muted'
  const borderCls = state === 'pending'
    ? 'border-warning-border/70 ring-2 ring-warning-soft'
    : 'border-brand-teal/30'
  return (
    <div className="relative flex-shrink-0">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center select-none overflow-hidden border-2 ${borderCls} ${bgCls}`} aria-hidden="true">
        {imageSrc
          ? <img src={imageSrc} alt="" className="w-full h-full object-cover" />
          : <span className="text-body-lg font-semibold">{initials}</span>
        }
      </div>
      {state === 'pending' && (
        <div className="absolute -bottom-0.5 -right-0.5 w-[22px] h-[22px] rounded-full bg-warning-soft border-2 border-surface flex items-center justify-center" aria-hidden="true">
          <Clock size={10} strokeWidth={2.5} className="text-warning" />
        </div>
      )}
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const inc        = mockIncident
const carmenData = mockOptions.find(o => o.id === 'opt-carmen')!

// ── Content ───────────────────────────────────────────────────────────────────

function ConfirmationContent({ onGoToIncidencias }: { onGoToIncidencias?: () => void }) {
  return (
    <div className="space-y-5">

      {/* 1 ── Status header */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <CheckCircle size={28} strokeWidth={1.75} className="text-mint flex-shrink-0" aria-hidden="true" />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-heading font-semibold text-foreground leading-tight">Asignación validada</h1>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-small font-medium bg-warning-soft text-warning border border-warning-border">
                <Clock size={13} strokeWidth={2.25} aria-hidden="true" />
                Pendiente de respuesta
              </span>
            </div>
            <p className="text-body text-foreground-muted leading-relaxed mt-1">
              Carmen Ruiz ha sido notificada. La asignación es efectiva salvo rechazo justificado.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-dashed border-line" />

      {/* 3 ── Confirmed shift */}
      <ShiftCard
        accent="success"
        title={`${inc.unit} · Hospital Clínico (Valencia)`}
        staffingTone="success"
        staffingLabel={`Personal: ${inc.unitMinStaff} / ${inc.unitMinStaff}`}
        reserveTone="warning"
        reserveLabel="Reserva: 0"
      />

      {/* 4 ── Confirmed person */}
      <div className="flex items-center gap-3">
        <Avatar initials="CR" imageSrc={carmenData.avatarSrc} variant="mint" state="pending" />
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-title font-semibold text-foreground leading-tight">
              {carmenData.nurseName}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label font-semibold bg-success-bg text-success border border-success-border whitespace-nowrap">
              <Bell size={10} strokeWidth={2} aria-hidden="true" />
              Notificada
            </span>
          </div>
          <p className="text-small text-foreground-muted mt-0.5">
            Enfermera UCI · Era la reserva
          </p>
        </div>
      </div>

      <div className="border-t border-dashed border-line" />

      {/* 5 ── What happens next */}
      <div className="space-y-3">
        <p className="text-body-lg font-medium text-foreground">¿Qué pasa ahora?</p>
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-surface-alt flex items-center justify-center -mt-px" aria-hidden="true">
              <Clock size={14} strokeWidth={2} className="text-foreground-muted" />
            </div>
            <p className="text-body text-foreground-muted leading-snug">
              Carmen tiene hasta las{' '}
              <span className="font-medium text-foreground">20:00h</span>{' '}
              para aceptar o rechazar con causa justificada.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-surface-alt flex items-center justify-center -mt-px" aria-hidden="true">
              <RotateCcw size={14} strokeWidth={2} className="text-foreground-muted" />
            </div>
            <p className="text-body text-foreground-muted leading-snug">
              Si rechaza, la incidencia vuelve a estado abierto y el sistema buscará alternativas.
            </p>
          </div>
          <div className="flex items-start gap-2 rounded-xl border border-line bg-surface-alt px-3 py-2.5">
            <CircleHelp size={14} strokeWidth={2} className="text-foreground-subtle flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-small text-foreground-muted leading-relaxed">
              <span className="font-medium text-foreground">Asignado ≠ Cerrado.</span>{' '}
              La profesional puede rechazar con causa justificada: conciliación familiar,
              salud mental (Art. 34.8 ET) o incapacidad médica.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-dashed border-line" />

      {/* 6 ── Actions */}
      <div className="flex flex-col gap-3 pb-2 lg:flex-row lg:justify-start">
        <button
          type="button"
          onClick={onGoToIncidencias}
          className="w-full lg:w-auto lg:min-w-[220px] inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-body font-medium bg-brand-teal text-white hover:bg-brand-teal-hover transition-colors cursor-pointer min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
        >
          Ir a Incidencias
        </button>
        <button
          type="button"
          onClick={() => console.log('ver plan semanal')}
          className="w-full lg:w-auto lg:min-w-[200px] inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-body font-medium border border-brand-teal text-brand-teal hover:bg-surface-alt transition-colors cursor-pointer min-h-[42px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
        >
          Ver plan semanal
        </button>
      </div>

    </div>
  )
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function Moment3Layout({ onGoToIncidencias }: Moment3LayoutProps) {
  const [isMobileMenuOpen, setMobileMenu] = useState(false)

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
              onClick={onGoToIncidencias}
              className="text-small text-brand-teal hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm"
            >
              Incidencias
            </button>
            <ChevronRight size={12} strokeWidth={2} className="text-foreground-subtle flex-shrink-0" aria-hidden="true" />
            <button
              type="button"
              onClick={onGoToIncidencias}
              className="text-small text-foreground-muted hover:text-brand-teal hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded-sm"
            >
              Baja médica: Laura García
            </button>
            <ChevronRight size={12} strokeWidth={2} className="text-foreground-subtle flex-shrink-0" aria-hidden="true" />
            <span className="text-small text-foreground-muted truncate">Confirmación</span>
          </nav>
          <div className="hidden md:block ml-auto">
            <HelpButton />
          </div>
        </div>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
          <div className="mx-auto max-w-2xl lg:max-w-[1080px] lg:flex lg:gap-6 lg:items-start">

            {/* Left — confirmation content */}
            <div className="min-w-0 lg:flex-[1.7]">
              <ConfirmationContent onGoToIncidencias={onGoToIncidencias} />
            </div>

            {/* Divider — stacked on mobile/tablet */}
            <div className="mt-4 border-t border-dashed border-line lg:hidden" />

            {/* Right — weekly + monthly plan (confirmed state) */}
            <div className="mt-4 lg:mt-0 lg:flex-1 lg:sticky lg:top-0 space-y-4">
              <WeeklyPlanPanel {...mockWeeklyPlanConfirmed} />
              <MonthlyPlanPanel {...mockMonthlyPlan} />
            </div>

          </div>
        </main>

      </div>
    </div>
  )
}
