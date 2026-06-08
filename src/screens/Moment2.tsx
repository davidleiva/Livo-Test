import { Sparkles } from 'lucide-react'
import { Badge } from '../components/ui'
import {
  IncidentHeader,
  OptionCard,
  StickyActionBar,
  ScreenShell,
} from '../components/domain'
import { mockIncident, mockOptions } from '../data'
import type { CoverageOption, ConsequenceLayer, OptionStatus } from '../types'

export interface Moment2Props {
  onNavigate?: (screen: 'moment1' | 'moment3') => void
}

// ── Shared maps (used in both layouts) ──────────────────────────────────────

const statusBadgeTone: Record<OptionStatus, 'mint' | 'warning'> = {
  recommended: 'mint',
  cost:        'warning',
  fragile:     'warning',
}

const statusLabel: Record<OptionStatus, string> = {
  recommended: 'Recomendada',
  cost:        'Con coste',
  fragile:     'Plan frágil',
}

const toneTailwind: Record<ConsequenceLayer['tone'], string> = {
  neutral: 'text-foreground-muted',
  success: 'text-success',
  warning: 'text-warning',
  danger:  'text-danger',
}

const timeframeLabel: Record<ConsequenceLayer['timeframe'], string> = {
  today: 'Hoy',
  week:  'Esta semana',
  month: 'Este mes',
}

const TIMEFRAMES: ConsequenceLayer['timeframe'][] = ['today', 'week', 'month']

// ── Desktop: option column header ───────────────────────────────────────────

function ColumnHeader({ option }: { option: CoverageOption }) {
  const highlighted = option.isAgentChoice
  return (
    <div
      className={[
        'rounded-lg p-2.5 space-y-1.5',
        highlighted
          ? 'bg-info-bg border border-info-border'
          : 'bg-surface-alt border border-line opacity-75',
      ].join(' ')}
    >
      {highlighted && (
        <div className="flex items-center gap-1">
          <Sparkles size={11} strokeWidth={2} className="text-mint flex-shrink-0" aria-hidden="true" />
          <span className="text-label font-medium text-info uppercase tracking-wide">
            Elección del agente
          </span>
        </div>
      )}
      <p className="text-body font-semibold text-foreground leading-tight">{option.nurseName}</p>
      <Badge tone={statusBadgeTone[option.status]} size="sm">
        {statusLabel[option.status]}
      </Badge>
    </div>
  )
}

// ── Desktop: full comparison table ──────────────────────────────────────────

function ComparisonTable({ options }: { options: CoverageOption[] }) {
  return (
    <div className="space-y-0">
      {/* Header row — option names */}
      <div className="grid grid-cols-[72px_1fr_1fr_1fr] gap-x-3 gap-y-0 mb-3">
        <div /> {/* empty label cell */}
        {options.map((opt) => (
          <ColumnHeader key={opt.id} option={opt} />
        ))}
      </div>

      {/* Consequence rows — one per timeframe */}
      {TIMEFRAMES.map((tf, i) => (
        <div
          key={tf}
          className={[
            'grid grid-cols-[72px_1fr_1fr_1fr] gap-x-3 items-start py-3',
            i > 0 ? 'border-t border-line' : '',
          ].join(' ')}
        >
          {/* Timeframe label */}
          <span className="text-label font-medium uppercase tracking-wide text-foreground-subtle pt-0.5">
            {timeframeLabel[tf]}
          </span>

          {/* One cell per option */}
          {options.map((opt) => {
            const layer = opt.consequences.find((c) => c.timeframe === tf)
            return (
              <p
                key={opt.id}
                className={[
                  'text-small leading-snug',
                  layer ? toneTailwind[layer.tone] : 'text-foreground-subtle',
                  !opt.isAgentChoice ? 'opacity-80' : '',
                ].join(' ')}
              >
                {layer?.text ?? '—'}
              </p>
            )
          })}
        </div>
      ))}
    </div>
  )
}

// ── Screen ──────────────────────────────────────────────────────────────────

const agentChoice  = mockOptions.find((o) => o.isAgentChoice)!
const discarded    = mockOptions.filter((o) => !o.isAgentChoice)

export default function Moment2({ onNavigate }: Moment2Props) {
  return (
    <ScreenShell
      wide
      title="Por qué Carmen"
      subtitle="Razonamiento del agente"
      onBack={() => onNavigate?.('moment1')}
      actionBar={
        <StickyActionBar
          primaryLabel="Validar Carmen"
          onPrimary={() => onNavigate?.('moment3')}
          secondaryActions={[{ label: 'Elegir otra', onClick: () => {} }]}
          microcopy="Al validar, se asignará el turno a Carmen Ruiz y se le notificará."
        />
      }
    >

      {/* ════════════════════════════════════════════════
          MOBILE — stacked cards, discarded de-emphasised
          ════════════════════════════════════════════════ */}
      <div className="md:hidden space-y-4">
        <OptionCard option={agentChoice} />

        <p className="text-label font-semibold uppercase tracking-wide text-foreground-subtle px-0.5">
          Descartadas
        </p>

        {discarded.map((opt) => (
          <div key={opt.id} className="opacity-70">
            <OptionCard option={opt} />
          </div>
        ))}
      </div>

      {/* ════════════════════════════════════════════════
          DESKTOP — sidebar + comparison table
          ════════════════════════════════════════════════ */}
      <div className="hidden md:flex gap-6 items-start">

        {/* Left: incident context — stays in view while reading the table */}
        <aside className="w-44 flex-shrink-0 space-y-4">
          <IncidentHeader incident={mockIncident} />

          <div className="border-t border-line pt-4 space-y-2">
            <p className="text-label font-medium uppercase tracking-wide text-foreground-subtle">
              Razonamiento
            </p>
            <p className="text-small text-foreground-muted leading-snug italic">
              {agentChoice.rationale}
            </p>
          </div>
        </aside>

        {/* Right: comparison table */}
        <div className="flex-1 min-w-0">
          <ComparisonTable options={mockOptions} />
        </div>

      </div>

    </ScreenShell>
  )
}
