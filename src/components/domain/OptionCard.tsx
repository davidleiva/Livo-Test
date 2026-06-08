import { Sparkles } from 'lucide-react'
import { Card, Badge } from '../ui'
import ConsequenceLayer from './ConsequenceLayer'
import type { CoverageOption, OptionStatus } from '../../types'

export interface OptionCardProps {
  option?: CoverageOption
  onSelect?: (id: string) => void
}

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

const defaultOption: CoverageOption = {
  id: 'preview',
  nurseName: 'Carmen Ruiz',
  specialty: 'UCI',
  status: 'recommended',
  coverage: 'full',
  isAgentChoice: true,
  rationale: 'Única enfermera UCI disponible dentro de su jornada contratada.',
  consequences: [
    { timeframe: 'today', text: 'UCI con dotación completa 4/4.', tone: 'success' },
    { timeframe: 'week',  text: 'Sin horas extra — dentro de jornada contratada.', tone: 'neutral' },
    { timeframe: 'month', text: 'Plan mensual estable. Margen conservado.', tone: 'success' },
  ],
}

export default function OptionCard({ option = defaultOption, onSelect }: OptionCardProps) {
  return (
    <Card
      shiftType="night"
      selected={option.isAgentChoice}
      onClick={onSelect ? () => onSelect(option.id) : undefined}
      padding="md"
    >
      {/* Header: nurse name + status badge */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-title font-semibold text-foreground leading-tight">
              {option.nurseName}
            </span>
            <span className="text-small text-foreground-subtle">{option.specialty}</span>
          </div>

          {/* Agent-choice marker */}
          {option.isAgentChoice && (
            <div className="flex items-center gap-1 mt-0.5">
              <Sparkles size={12} strokeWidth={2} className="text-mint flex-shrink-0" aria-hidden="true" />
              <span className="text-label font-medium text-info uppercase tracking-wide">
                Elegida por el agente
              </span>
            </div>
          )}
        </div>

        <Badge tone={statusBadgeTone[option.status]} size="sm">
          {statusLabel[option.status]}
        </Badge>
      </div>

      {/* Agent rationale */}
      {option.rationale && (
        <p className="text-small text-foreground-muted italic mb-3 leading-snug">
          {option.rationale}
        </p>
      )}

      {/* Consequence rows */}
      <div className="border-t border-line pt-2 divide-y divide-line/60">
        {option.consequences.map((layer) => (
          <ConsequenceLayer key={layer.timeframe} layer={layer} />
        ))}
      </div>

      {/* Legal note */}
      {option.legalNote && (
        <div className="mt-2.5 pt-2.5 border-t border-warning-border">
          <p className="text-small text-warning leading-snug">
            ⚠ {option.legalNote}
          </p>
        </div>
      )}
    </Card>
  )
}
