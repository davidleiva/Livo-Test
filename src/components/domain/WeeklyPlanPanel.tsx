import { ArrowRight } from 'lucide-react'
import type { WeeklyPlan, WeeklyPlanDay } from '../../types'

export type WeeklyPlanPanelProps = WeeklyPlan

function ReserveCell({ day }: { day: WeeklyPlanDay }) {
  if (day.projectedReserve !== undefined) {
    return (
      <div className="flex items-center gap-1 flex-shrink-0">
        <span className={`px-1.5 py-0.5 rounded text-label font-semibold ${
          day.reserve > 0 ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'
        }`}>
          {day.reserve}
        </span>
        <ArrowRight size={10} strokeWidth={2.5} className="text-foreground-subtle" aria-hidden="true" />
        <span className="px-1.5 py-0.5 rounded text-label font-semibold bg-warning-soft text-warning border border-warning-border">
          {day.projectedReserve}
        </span>
      </div>
    )
  }
  return (
    <span className={`flex-shrink-0 px-2 py-0.5 rounded text-label font-medium ${
      day.reserve > 0 ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'
    }`}>
      Reserva {day.reserve}
    </span>
  )
}

export default function WeeklyPlanPanel({ unitLabel, planStatus, planStatusLabel, days, footnote }: WeeklyPlanPanelProps) {
  return (
    <div className="border border-card-border rounded-xl bg-surface overflow-hidden">

      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-line">
        <div className="flex items-start justify-between gap-2">
          <p className="text-body font-semibold text-foreground leading-tight">
            Plan semanal · {unitLabel}
          </p>
          {planStatus === 'fragile' ? (
            <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-warning-soft text-warning text-label font-semibold whitespace-nowrap border border-warning-border">
              {planStatusLabel ?? 'Pasa a frágil'}
            </span>
          ) : (
            <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-success-bg text-success text-label font-semibold whitespace-nowrap">
              {planStatusLabel ?? 'Estable'}
            </span>
          )}
        </div>
        <p className="text-small text-foreground-muted mt-1">Reserva disponible por día</p>
      </div>

      {/* Day rows */}
      <div className="p-3 space-y-1.5">
        {days.map((day) =>
          day.isToday ? (
            <div
              key={day.label}
              className="flex items-center justify-between gap-3 px-3 py-2 bg-mint-soft border border-mint rounded-md"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-label font-semibold text-success uppercase tracking-wide">Hoy</span>
                <span className="text-small font-medium text-foreground truncate">{day.label}</span>
              </div>
              <ReserveCell day={day} />
            </div>
          ) : (
            <div
              key={day.label}
              className="flex items-center justify-between gap-3 px-3 py-2 bg-surface-alt rounded-md"
            >
              <span className="text-small text-foreground-muted truncate">{day.label}</span>
              <ReserveCell day={day} />
            </div>
          )
        )}
      </div>

      {/* Footnote */}
      <div className="border-t border-line px-4 pt-3 pb-2">
        <p className="text-small text-foreground-muted leading-snug">{footnote}</p>
      </div>

      {/* Navigation stub */}
      <div className="px-3 pb-3">
        <button
          type="button"
          onClick={() => console.log('ver plan semanal')}
          className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg text-body font-medium border border-brand-teal text-brand-teal hover:bg-surface-alt transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
        >
          Ver plan semanal
        </button>
      </div>

    </div>
  )
}
