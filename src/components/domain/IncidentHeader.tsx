import { Sun, Sunset, Moon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Badge } from '../ui'
import type { Incident, ShiftType } from '../../types'

export interface IncidentHeaderProps {
  incident?: Incident
}

const shiftIcon: Record<ShiftType, LucideIcon> = {
  morning:   Sun,
  afternoon: Sunset,
  night:     Moon,
}

const shiftLabel: Record<ShiftType, string> = {
  morning:   'Mañana',
  afternoon: 'Tarde',
  night:     'Noche',
}

const defaultIncident: Incident = {
  id: 'preview',
  nurseName: 'Laura García',
  unit: 'UCI',
  shiftType: 'night',
  startTime: '22:00',
  endTime: '06:00',
  startsInHours: 4,
  criticality: 'high',
  reason: 'Baja médica',
  unitMinStaff: 4,
  currentStaff: 3,
}

export default function IncidentHeader({ incident = defaultIncident }: IncidentHeaderProps) {
  const ShiftIcon = shiftIcon[incident.shiftType]
  const staffDelta = incident.unitMinStaff - incident.currentStaff

  return (
    <div className="space-y-3">
      {/* Criticality + urgency row */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge tone="danger">
          {incident.criticality === 'high' ? 'Criticidad alta' : incident.criticality === 'medium' ? 'Media' : 'Baja'}
        </Badge>
        <span className="text-small text-foreground-muted">
          Empieza en <span className="font-semibold text-foreground">{incident.startsInHours}h</span>
        </span>
        <span className="text-small text-foreground-subtle">·</span>
        <span className="text-small text-foreground-muted">{incident.reason}</span>
      </div>

      {/* Nurse name */}
      <div>
        <h1 className="text-heading font-semibold text-foreground leading-tight">
          {incident.nurseName}
        </h1>
        {/* Unit + shift time */}
        <div className="flex items-center gap-1.5 mt-1 text-body text-foreground-muted">
          <ShiftIcon size={14} strokeWidth={2} className="text-foreground-subtle flex-shrink-0" aria-hidden="true" />
          <span>{incident.unit}</span>
          <span className="text-foreground-subtle">·</span>
          <span>{shiftLabel[incident.shiftType]}</span>
          <span className="text-foreground-subtle">·</span>
          <span className="font-medium text-foreground">{incident.startTime}–{incident.endTime}</span>
        </div>
      </div>

      {/* Staffing risk */}
      {staffDelta > 0 && (
        <div className="flex items-start gap-2 px-3 py-2.5 bg-danger-bg border border-danger-border rounded-md">
          <span className="text-danger text-body leading-snug">
            <span className="font-semibold">{incident.unit} necesita {incident.unitMinStaff} enfermeras, ahora hay {incident.currentStaff}</span>
            {' '}— por debajo del mínimo de seguridad.
          </span>
        </div>
      )}
    </div>
  )
}
