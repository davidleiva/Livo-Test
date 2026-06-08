import type { ValidationPreview } from '../../types'

export interface ConsequencePreviewProps {
  preview?: ValidationPreview
}

type Accent = 'success' | 'info' | 'neutral'

interface Block {
  label: string
  value: string
  accent: Accent
}

const accentBar: Record<Accent, string> = {
  success: 'border-success-border',
  info:    'border-info-border',
  neutral: 'border-line',
}

function PreviewBlock({ label, value, accent }: Block) {
  return (
    <div className={`border-l-2 pl-3 py-0.5 ${accentBar[accent]}`}>
      <p className="text-label font-medium uppercase tracking-wide text-foreground-subtle mb-0.5">
        {label}
      </p>
      <p className="text-body text-foreground leading-snug">{value}</p>
    </div>
  )
}

const defaultPreview: ValidationPreview = {
  whatChanges:
    'Carmen Ruiz cubre el turno UCI noche 22:00–06:00 en sustitución de Laura García.',
  whyViable:
    'Dentro de jornada contratada. Respeta descanso mínimo de 12h. Sin conflicto con convenio.',
  whatDoesntChange:
    'El resto del plan semanal queda intacto. Ninguna otra enfermera se ve afectada.',
  resultingDebt:
    'Sin deuda. Margen del plan mensual conservado.',
  affected:
    'Carmen Ruiz (pendiente aceptación). Laura García (baja registrada).',
}

export default function ConsequencePreview({ preview = defaultPreview }: ConsequencePreviewProps) {
  const blocks: Block[] = [
    { label: 'Qué cambia',        value: preview.whatChanges,      accent: 'success' },
    { label: 'Por qué es viable', value: preview.whyViable,        accent: 'success' },
    { label: 'Qué NO cambia',     value: preview.whatDoesntChange, accent: 'neutral' },
    { label: 'Deuda resultante',  value: preview.resultingDebt,    accent: 'info'    },
    { label: 'Afectados',         value: preview.affected,         accent: 'neutral' },
  ]

  return (
    <div className="space-y-4">
      {blocks.map((block) => (
        <PreviewBlock key={block.label} {...block} />
      ))}
    </div>
  )
}
