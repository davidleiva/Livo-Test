import type { MonthlyPlan } from '../../types'

export type MonthlyPlanPanelProps = MonthlyPlan

type DayState = 'margin' | 'no-reserve' | 'today-no-reserve'

const WEEKDAY_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

const STATUS_CONFIG: Record<MonthlyPlan['status'], { label: string; cls: string }> = {
  low:    { label: 'Bajo impacto',  cls: 'bg-success-bg text-success' },
  medium: { label: 'Impacto medio', cls: 'bg-warning-bg text-warning' },
  high:   { label: 'Alto impacto',  cls: 'bg-danger-bg  text-danger'  },
}

const DAY_CELL_CLS: Record<DayState, string> = {
  'margin':           'bg-success-bg text-success',
  'no-reserve':       'bg-warning-bg text-warning',
  'today-no-reserve': 'bg-warning-border text-white font-bold ring-2 ring-brand-teal ring-offset-1',
}

const defaultProps: MonthlyPlan = {
  monthLabel: 'Junio',
  status: 'low',
  firstWeekday: 6,
  daysInMonth: 30,
  days: [
    { day: 4, state: 'today-no-reserve' },
    { day: 5, state: 'no-reserve' },
  ],
  footnote: 'Junio conserva margen casi todo el mes. La tensión se concentra en esta semana — impacto mensual bajo.',
}

export default function MonthlyPlanPanel({
  monthLabel   = defaultProps.monthLabel,
  status       = defaultProps.status,
  firstWeekday = defaultProps.firstWeekday,
  daysInMonth  = defaultProps.daysInMonth,
  days         = defaultProps.days,
  footnote     = defaultProps.footnote,
}: Partial<MonthlyPlanPanelProps> = {}) {
  const { label: statusLabel, cls: statusCls } = STATUS_CONFIG[status]

  const dayStateMap = new Map(days.map(d => [d.day, d.state as DayState]))

  // Build cell array: leading nulls + day numbers + trailing nulls to fill last row
  const cells: (number | null)[] = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="border border-card-border rounded-xl bg-surface overflow-hidden">

      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-line">
        <div className="flex items-start justify-between gap-2">
          <p className="text-body font-semibold text-foreground leading-tight">
            Impacto en {monthLabel}
          </p>
          <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-label font-semibold whitespace-nowrap ${statusCls}`}>
            {statusLabel}
          </span>
        </div>
        <p className="text-small text-foreground-muted mt-1">Margen de reserva por día</p>
      </div>

      {/* Calendar */}
      <div className="px-3 pt-3 pb-2">

        {/* Weekday header row */}
        <div className="grid grid-cols-7 gap-1 mb-1.5">
          {WEEKDAY_LABELS.map(d => (
            <div key={d} className="text-center text-label font-medium text-foreground-subtle uppercase tracking-wide">
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} aria-hidden="true" />
            }
            const state = dayStateMap.get(day) ?? 'margin'
            return (
              <div
                key={day}
                className={`aspect-square flex items-center justify-center rounded text-label ${DAY_CELL_CLS[state]}`}
                aria-label={state === 'today-no-reserve' ? `${day}, hoy, sin reserva` : undefined}
              >
                {day}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-success-bg flex-shrink-0" aria-hidden="true" />
            <span className="text-label text-foreground-subtle">Con margen</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-warning-bg flex-shrink-0" aria-hidden="true" />
            <span className="text-label text-foreground-subtle">Sin reserva</span>
          </div>
        </div>
      </div>

      {/* Footnote */}
      <div className="border-t border-line px-4 pt-3 pb-2">
        <p className="text-small text-foreground-muted leading-snug">{footnote}</p>
      </div>

      {/* Navigation stub */}
      <div className="px-3 pb-3">
        <button
          type="button"
          onClick={() => console.log('ver plan mensual')}
          className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg text-body font-medium border border-brand-teal text-brand-teal hover:bg-surface-alt transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1"
        >
          Ver plan mensual
        </button>
      </div>

    </div>
  )
}
