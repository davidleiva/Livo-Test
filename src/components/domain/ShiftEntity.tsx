import { Sun, Sunset, Moon, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ShiftType } from '../../types'

interface Staffing {
  current: number
  required: number
}

interface ProjectedState {
  staffing: Staffing
  reserve: number
}

export interface ShiftEntityProps {
  unit?: string
  shiftType?: ShiftType
  startTime?: string
  endTime?: string
  staffing?: Staffing
  reserve?: number
  /** When set, renders each indicator as a "current → [projected]" transition */
  projected?: ProjectedState
}

// ── Maps ────────────────────────────────────────────────────────────────────

const shiftBarClass: Record<ShiftType, string> = {
  morning:   'bg-shift-morning',
  afternoon: 'bg-shift-afternoon',
  night:     'bg-shift-night',
}

const shiftIcon: Record<ShiftType, LucideIcon> = {
  morning:   Sun,
  afternoon: Sunset,
  night:     Moon,
}

const shiftTypeLabel: Record<ShiftType, string> = {
  morning:   'Turno Mañana',
  afternoon: 'Turno Tarde',
  night:     'Turno Noche',
}

// ── Pill helpers ─────────────────────────────────────────────────────────────

type PillTone = 'danger' | 'success' | 'warning' | 'neutral'

const pillClasses: Record<PillTone, string> = {
  danger:  'bg-danger-bg  text-danger',
  success: 'bg-success-bg text-success',
  warning: 'bg-warning-bg text-warning',
  neutral: 'bg-surface-alt text-foreground-muted',
}

function Pill({ text, tone }: { text: string; tone: PillTone }) {
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-small font-semibold whitespace-nowrap ${pillClasses[tone]}`}>
      {text}
    </span>
  )
}

function staffingTone(s: Staffing): PillTone {
  return s.current >= s.required ? 'success' : 'danger'
}

function reserveTone(n: number): PillTone {
  return n === 0 ? 'warning' : 'neutral'
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ShiftEntity({
  unit = 'UCI',
  shiftType = 'night',
  startTime = '22:00',
  endTime = '06:00',
  staffing = { current: 3, required: 4 },
  reserve = 1,
  projected,
}: ShiftEntityProps) {
  const Icon = shiftIcon[shiftType]

  return (
    <div className="flex overflow-hidden rounded-lg border border-line bg-surface">
      {/* Shift-type color bar */}
      <div className={`w-1.5 flex-shrink-0 ${shiftBarClass[shiftType]}`} aria-hidden="true" />

      {/* Content */}
      <div className="flex items-center justify-between gap-3 flex-1 px-3 py-3">

        {/* Left: icon + shift info */}
        <div className="flex items-center gap-2 min-w-0">
          <Icon size={15} strokeWidth={2} className="text-foreground-subtle flex-shrink-0" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-body font-semibold text-foreground leading-tight">{unit}</p>
            <p className="text-small text-foreground-muted">
              {shiftTypeLabel[shiftType]} · {startTime}–{endTime}
            </p>
          </div>
        </div>

        {/* Right: stacked indicators */}
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">

          {/* Staffing indicator */}
          {!projected ? (
            <Pill text={`${staffing.current}/${staffing.required}`} tone={staffingTone(staffing)} />
          ) : (
            <div className="flex items-center gap-1" aria-label={`Dotación: ${staffing.current}/${staffing.required} pasará a ${projected.staffing.current}/${projected.staffing.required}`}>
              <Pill text={`${staffing.current}/${staffing.required}`} tone={staffingTone(staffing)} />
              <ArrowRight size={10} strokeWidth={2.5} className="text-foreground-subtle" aria-hidden="true" />
              <Pill text={`[${projected.staffing.current}/${projected.staffing.required}]`} tone={staffingTone(projected.staffing)} />
            </div>
          )}

          {/* Reserve indicator */}
          {!projected ? (
            <Pill text={`Reserva: ${reserve}`} tone={reserveTone(reserve)} />
          ) : (
            <div className="flex items-center gap-1" aria-label={`Reserva: ${reserve} pasará a ${projected.reserve}`}>
              <Pill text={`Reserva: ${reserve}`} tone={reserveTone(reserve)} />
              <ArrowRight size={10} strokeWidth={2.5} className="text-foreground-subtle" aria-hidden="true" />
              <Pill text={`[${projected.reserve}]`} tone={reserveTone(projected.reserve)} />
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
