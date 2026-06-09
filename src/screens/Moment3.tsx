import { useState } from 'react'
import { CheckCircle, Clock } from 'lucide-react'
import { Badge, Button } from '../components/ui'
import {
  ConsequencePreview,
  StickyActionBar,
  ScreenShell,
} from '../components/domain'
import { mockOptions, mockValidationPreview } from '../data'

export interface Moment3Props {
  onNavigate?: (screen: 'moment2' | 'moment1') => void
}

const agentChoice = mockOptions.find((o) => o.isAgentChoice)!

// ── Nurse initials avatar ────────────────────────────────────────────────────

function NurseAvatar({ name, imageSrc }: { name: string; imageSrc?: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <div
      className="w-9 h-9 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0 overflow-hidden"
      aria-hidden="true"
    >
      {imageSrc ? (
        <img src={imageSrc} alt="" className="w-full h-full object-cover" />
      ) : (
        <span className="text-small font-semibold text-white">{initials}</span>
      )}
    </div>
  )
}

// ── Success state ────────────────────────────────────────────────────────────

function SuccessView({ onRestart }: { onRestart?: () => void }) {
  return (
    <ScreenShell
      title="Turno asignado"
      subtitle="Pendiente confirmación de Carmen"
    >
      <div className="flex flex-col items-center text-center py-8 px-2 space-y-5">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-success-bg flex items-center justify-center">
          <CheckCircle size={32} strokeWidth={1.75} className="text-success" aria-hidden="true" />
        </div>

        {/* Title + message */}
        <div className="space-y-1.5">
          <h2 className="text-title-lg font-semibold text-foreground">
            Asignación validada
          </h2>
          <p className="text-body text-foreground-muted leading-snug max-w-xs mx-auto">
            Carmen ha recibido el aviso. Te avisaremos cuando confirme.
          </p>
        </div>

        {/* Regulation reality: assigned ≠ closed */}
        <div className="flex items-center gap-2 px-3 py-2 bg-surface-alt border border-line rounded-lg">
          <Clock size={13} strokeWidth={2} className="text-foreground-subtle flex-shrink-0" aria-hidden="true" />
          <p className="text-small text-foreground-muted leading-snug text-left">
            El turno queda <span className="font-medium text-foreground">confirmado cuando Carmen responda</span>.
            Puede rechazarlo con causa justificada.
          </p>
        </div>

        {/* Status badge */}
        <Badge tone="success" outlined size="md">
          Asignado · Pendiente enfermera
        </Badge>

        {/* Restart */}
        <Button
          variant="secondary"
          onClick={onRestart}
        >
          Volver al inicio
        </Button>
      </div>
    </ScreenShell>
  )
}

// ── Main screen ──────────────────────────────────────────────────────────────

export default function Moment3({ onNavigate }: Moment3Props) {
  const [validated, setValidated] = useState(false)

  if (validated) {
    return <SuccessView onRestart={() => onNavigate?.('moment1')} />
  }

  return (
    <ScreenShell
      title="Validar decisión"
      subtitle="Antes de aplicar"
      onBack={() => onNavigate?.('moment2')}
      actionBar={
        <StickyActionBar
          primaryLabel="Validar asignación"
          onPrimary={() => setValidated(true)}
          secondaryActions={[
            { label: 'Borrador', onClick: () => {} },
            { label: 'Escalar',  onClick: () => {} },
          ]}
          microcopy="Al validar, se asigna el turno y Carmen recibe el aviso. El turno queda confirmado cuando ella responda."
        />
      }
    >
      {/* 1 ── Compact nurse assignment row */}
      <div className="flex items-center gap-3 px-3 py-3 bg-surface-alt border border-line rounded-lg">
        <NurseAvatar name={agentChoice.nurseName} imageSrc={agentChoice.avatarSrc} />
        <div className="min-w-0">
          <p className="text-body font-semibold text-foreground leading-tight">
            {agentChoice.nurseName}
          </p>
          <p className="text-small text-foreground-muted mt-px">
            Cubre UCI noche 22:00–06:00
          </p>
        </div>
        <div className="ml-auto flex-shrink-0">
          <Badge tone="mint" size="sm">Recomendada</Badge>
        </div>
      </div>

      {/* 2 ── Consequence preview — read before validating */}
      <ConsequencePreview preview={mockValidationPreview} />
    </ScreenShell>
  )
}
