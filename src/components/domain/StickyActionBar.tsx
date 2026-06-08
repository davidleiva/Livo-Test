import { Info } from 'lucide-react'
import { Button } from '../ui'

interface SecondaryAction {
  label: string
  onClick: () => void
}

export interface StickyActionBarProps {
  primaryLabel?: string
  onPrimary?: () => void
  secondaryActions?: SecondaryAction[]
  microcopy?: string
}

export default function StickyActionBar({
  primaryLabel = 'Validar asignación',
  onPrimary = () => {},
  secondaryActions = [{ label: 'Ver alternativas', onClick: () => {} }],
  microcopy = 'Al validar, Carmen Ruiz recibirá la asignación. Tiene derecho a rechazarla con causa justificada.',
}: StickyActionBarProps) {
  return (
    <div className="border-t border-line bg-surface px-4 pt-3 pb-4 space-y-3">
      {/* Friction microcopy */}
      <div className="flex items-start gap-2 text-small text-foreground-muted leading-snug">
        <Info size={14} strokeWidth={2} className="flex-shrink-0 mt-px text-info" aria-hidden="true" />
        <span>{microcopy}</span>
      </div>

      {/* Primary action */}
      <Button variant="primary" fullWidth onClick={onPrimary}>
        {primaryLabel}
      </Button>

      {/* Secondary actions */}
      {secondaryActions.length > 0 && (
        <div className="flex gap-2">
          {secondaryActions.map((action) => (
            <Button
              key={action.label}
              variant="secondary"
              fullWidth={secondaryActions.length === 1}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
