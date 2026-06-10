import { Sparkles, AlertCircle, ShieldAlert, Clock, Stethoscope, ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Badge } from '../components/ui'
import { ShiftEntity, PersonAvatar, ScreenShell } from '../components/domain'
import { mockIncident, mockOptions } from '../data'

export interface Moment1Props {
  onNavigate?: (screen: 'moment2' | 'moment3') => void
}

// ── Screen-local helpers ─────────────────────────────────────────────────────

function SemanticChip({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-success-bg border border-success-border">
      <Icon size={12} strokeWidth={2} className="text-success flex-shrink-0" aria-hidden="true" />
      <span className="text-small font-medium text-success whitespace-nowrap">{children}</span>
    </div>
  )
}

function OptionRow({
  title,
  context,
  chipLabel,
  imageSrc,
  imageSrcs,
  onClick,
}: {
  title: string
  context: string
  chipLabel: string
  imageSrc?: string
  imageSrcs?: string[]
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between gap-3 px-3 py-3 bg-surface border border-line rounded-lg hover:border-foreground-subtle transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {imageSrcs?.length ? (
          <PersonAvatar
            size="sm"
            badge="in"
            people={[
              { initials: 'ML', imageSrc: imageSrcs[0] },
              { initials: 'SM', imageSrc: imageSrcs[1] },
            ]}
          />
        ) : imageSrc ? (
          <img
            src={imageSrc}
            alt=""
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            aria-hidden="true"
          />
        ) : null}
        <div className="min-w-0">
          <p className="text-body font-medium text-foreground leading-tight">{title}</p>
          <p className="text-small text-foreground-muted mt-0.5">{context}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Badge tone="warning" size="sm">{chipLabel}</Badge>
        <ChevronRight size={14} strokeWidth={2} className="text-foreground-subtle" aria-hidden="true" />
      </div>
    </button>
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────

const inc = mockIncident
const agentChoice = mockOptions.find((o) => o.isAgentChoice)!
const anaOption = mockOptions.find((o) => o.id === 'opt-ana')!
const splitOption = mockOptions.find((o) => o.id === 'opt-split')!

// ── Body — content without shell (also used by LayoutDemo) ───────────────────

export function Moment1Body({ onNavigate }: Moment1Props) {
  return (
    <div className="space-y-4">

      {/* 1 ── Incident card — "the problem" */}
      <div className="border border-line rounded-lg p-4 space-y-3 bg-surface">

        <Badge tone="danger">Criticidad alta</Badge>

        {/* Absent person — three-line metadata */}
        <div className="flex items-start gap-3">
          <PersonAvatar initials="LG" imageSrc={inc.avatarSrc} badge="out" />
          <div className="min-w-0 pt-0.5">
            <p className="text-body text-foreground leading-snug">
              <span className="font-semibold">Baja médica:</span> {inc.nurseName}
            </p>
            <p className="text-small text-foreground-muted mt-0.5">
              Hoy no podrá cubrir {inc.unit} · Turno Noche
            </p>
            <p className="text-small text-foreground-subtle mt-0.5">
              Registrado hoy, 17:55h · Empieza en {inc.startsInHours}h
            </p>
          </div>
        </div>

        {/* Current shift state — no projection, shows the problem clearly */}
        <ShiftEntity
          unit={inc.unit}
          shiftType={inc.shiftType}
          startTime={inc.startTime}
          endTime={inc.endTime}
          staffing={{ current: inc.currentStaff, required: inc.unitMinStaff }}
          reserve={inc.reserve}
        />

        {/* Staffing deficit alert */}
        <div className="flex items-start gap-2.5 px-3 py-3 bg-danger-bg border border-danger-border rounded-lg">
          <AlertCircle size={16} strokeWidth={2} className="text-danger flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-body font-semibold text-danger">Falta 1 profesional</p>
            <p className="text-small text-danger mt-0.5">
              {inc.currentStaff} de {inc.unitMinStaff} en este turno — por debajo del mínimo.
            </p>
          </div>
        </div>

      </div>

      {/* 2 ── Agent block — outside solution card, honest framing */}
      <div className="flex items-start gap-2.5">
        <Sparkles size={15} strokeWidth={2} className="text-mint flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="text-body font-semibold text-foreground">Mejor solución encontrada</p>
          <p className="text-small text-foreground-muted mt-0.5">
            Cubre el turno, pero consume la reserva del plan semanal.
          </p>
        </div>
      </div>

      {/* 3 ── Solution card — "the solution" */}
      <div className="rounded-xl border-2 border-mint bg-surface p-4 space-y-4">

        {/* Projected shift: shows before → after */}
        <ShiftEntity
          unit={inc.unit}
          shiftType={inc.shiftType}
          startTime={inc.startTime}
          endTime={inc.endTime}
          staffing={{ current: inc.currentStaff, required: inc.unitMinStaff }}
          reserve={inc.reserve}
          projected={{
            staffing: { current: inc.unitMinStaff, required: inc.unitMinStaff },
            reserve: 0,
          }}
        />

        {/* Professional being assigned */}
        <PersonAvatar
          badge="in"
          initials="CR"
          imageSrc={agentChoice.avatarSrc}
          name={agentChoice.nurseName}
          subtitle={`Enfermería ${inc.unit} · era la reserva`}
        />

        {/* Why this is a good fit */}
        <div className="flex gap-2 flex-wrap">
          <SemanticChip icon={Clock}>Sin horas extra</SemanticChip>
          <SemanticChip icon={Stethoscope}>Misma especialidad</SemanticChip>
        </div>

        {/* Plan cost — softer amber so it doesn't compete with the danger alert above */}
        <div className="flex items-start gap-2.5 px-3 py-2.5 bg-warning-soft border border-warning-border rounded-lg">
          <ShieldAlert size={15} strokeWidth={2} className="text-warning flex-shrink-0 mt-px" aria-hidden="true" />
          <div>
            <p className="text-small font-semibold text-warning">El plan semanal queda frágil</p>
            <p className="text-small text-warning mt-0.5">
              Sin reserva. Si falla alguien más esta semana, no habrá margen.
            </p>
          </div>
        </div>

        {/* Link — above the button group, left-aligned, larger tap target on mobile */}
        <button
          type="button"
          onClick={() => onNavigate?.('moment2')}
          className="block w-full text-left py-3 md:py-1.5 text-body font-medium text-info hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1 rounded-sm"
        >
          Ver detalles y alternativas
        </button>

        <div className="border-t border-line" />

        {/* Decision button group — responsive */}
        <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-2">
          <button
            type="button"
            onClick={() => onNavigate?.('moment3')}
            className="w-full md:w-full lg:w-auto lg:flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-md text-body font-medium min-h-[44px] bg-brand-teal text-white hover:bg-brand-teal-hover transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
          >
            Validar
          </button>
          <button
            type="button"
            onClick={() => console.log('borrador')}
            className="w-full md:flex-1 lg:flex-none inline-flex items-center justify-center px-4 py-2.5 rounded-md text-body font-medium min-h-[44px] border border-line text-foreground hover:bg-surface-alt transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
          >
            Borrador
          </button>
          <button
            type="button"
            onClick={() => console.log('escalar')}
            className="w-full md:flex-1 lg:flex-none inline-flex items-center justify-center px-4 py-2.5 rounded-md text-body font-medium min-h-[44px] border border-line text-foreground hover:bg-surface-alt transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
          >
            Escalar
          </button>
        </div>

      </div>

      {/* 4 ── Other viable options */}
      <div className="space-y-2">
        <p className="text-label font-semibold uppercase tracking-wide text-foreground-subtle px-0.5">
          Otras soluciones viables
        </p>
        <OptionRow
          title="Ana Torres"
          context="+4h extra esta semana"
          chipLabel="Con coste"
          imageSrc={anaOption.avatarSrc}
          onClick={() => onNavigate?.('moment2')}
        />
        <OptionRow
          title="María L. + Sergio M."
          context="Turno dividido"
          chipLabel="Deja frágil"
          imageSrcs={splitOption.avatarSrcs}
          onClick={() => onNavigate?.('moment2')}
        />
      </div>

    </div>
  )
}

// ── Screen — wraps body in the standalone shell ───────────────────────────────

export default function Moment1({ onNavigate }: Moment1Props) {
  return (
    <ScreenShell title="Incidente">
      <Moment1Body onNavigate={onNavigate} />
    </ScreenShell>
  )
}
