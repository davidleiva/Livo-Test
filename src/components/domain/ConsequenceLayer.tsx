import type { ConsequenceLayer as ConsequenceLayerData } from '../../types'

export interface ConsequenceLayerProps {
  layer?: ConsequenceLayerData
}

const timeframeLabel: Record<ConsequenceLayerData['timeframe'], string> = {
  today: 'Hoy',
  week:  'Esta semana',
  month: 'Este mes',
}

const toneClass: Record<ConsequenceLayerData['tone'], string> = {
  neutral: 'text-foreground-muted',
  success: 'text-success',
  warning: 'text-warning',
  danger:  'text-danger',
}

const defaultLayer: ConsequenceLayerData = {
  timeframe: 'today',
  text: 'UCI con dotación completa 4/4.',
  tone: 'success',
}

export default function ConsequenceLayer({ layer = defaultLayer }: ConsequenceLayerProps) {
  return (
    <div className="flex items-baseline gap-3 py-1.5">
      {/* Fixed-width timeframe label — aligns across stacked rows */}
      <span className="w-[88px] flex-shrink-0 text-label font-medium uppercase tracking-wide text-foreground-subtle">
        {timeframeLabel[layer.timeframe]}
      </span>
      <span className={`text-body leading-snug ${toneClass[layer.tone]}`}>
        {layer.text}
      </span>
    </div>
  )
}
