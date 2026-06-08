import { Sparkles, ChevronRight } from 'lucide-react'
import { Button } from '../components/ui'
import {
  IncidentHeader,
  OptionCard,
  StickyActionBar,
  ScreenShell,
} from '../components/domain'
import { mockIncident, mockOptions } from '../data'

export interface Moment1Props {
  onNavigate?: (screen: 'moment2' | 'moment3') => void
}

const agentChoice = mockOptions.find((o) => o.isAgentChoice)!

export default function Moment1({ onNavigate }: Moment1Props) {
  return (
    <ScreenShell
      title="Incidente"
      subtitle={`${mockIncident.unit} · Noche · ${mockIncident.startTime}–${mockIncident.endTime}`}
      actionBar={
        <StickyActionBar
          primaryLabel="Validar y aplicar"
          onPrimary={() => onNavigate?.('moment3')}
          secondaryActions={[]}
          microcopy="Al validar, se asignará el turno a Carmen Ruiz y se le notificará. Puede rechazarlo con causa justificada."
        />
      }
    >
      {/* 1 ── Incident summary */}
      <IncidentHeader incident={mockIncident} />

      {/* 2 ── Agent message — first-person, teal/info tone */}
      <div className="flex items-start gap-3 px-3 py-3 bg-info-bg border border-info-border rounded-lg">
        <Sparkles
          size={15}
          strokeWidth={2}
          className="text-mint flex-shrink-0 mt-px"
          aria-hidden="true"
        />
        <p className="text-body text-foreground leading-snug">
          He cubierto el turno y mantenido el plan estable.{' '}
          <span className="text-foreground-muted">Revisa y valida.</span>
        </p>
      </div>

      {/* 3 ── Agent's chosen option */}
      <OptionCard option={agentChoice} />

      {/* 4 ── Link to reasoning (Moment 2) */}
      <Button
        variant="secondary"
        fullWidth
        rightIcon={ChevronRight}
        onClick={() => onNavigate?.('moment2')}
      >
        Ver por qué eligió esta opción
      </Button>
    </ScreenShell>
  )
}
