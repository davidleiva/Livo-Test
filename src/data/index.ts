import type { Incident, CoverageOption, ValidationPreview } from '../types'

export const mockIncident: Incident = {
  id: 'inc-001',
  nurseName: 'Laura García',
  unit: 'ICU',
  shiftType: 'night',
  startTime: '22:00',
  endTime: '06:00',
  startsInHours: 4,
  criticality: 'high',
  reason: 'Baja médica',
  unitMinStaff: 4,
  currentStaff: 3,
}

export const mockOptions: CoverageOption[] = [
  {
    id: 'opt-carmen',
    nurseName: 'Carmen Ruiz',
    specialty: 'ICU',
    status: 'recommended',
    coverage: 'full',
    isAgentChoice: true,
    rationale: 'Única enfermera ICU disponible dentro de su jornada contratada. No genera horas extra ni deuda de planificación.',
    consequences: [
      {
        timeframe: 'today',
        text: 'UCI con dotación completa 4/4.',
        tone: 'success',
      },
      {
        timeframe: 'week',
        text: 'Sin horas extra — dentro de su jornada contratada.',
        tone: 'neutral',
      },
      {
        timeframe: 'month',
        text: 'Plan mensual estable. Margen de cobertura conservado.',
        tone: 'success',
      },
    ],
  },
  {
    id: 'opt-ana',
    nurseName: 'Ana Torres',
    specialty: 'ICU',
    status: 'cost',
    coverage: 'full',
    isAgentChoice: false,
    consequences: [
      {
        timeframe: 'today',
        text: 'UCI cubierta al 4/4.',
        tone: 'success',
      },
      {
        timeframe: 'week',
        text: '+4h extra — supera el límite del convenio colectivo.',
        tone: 'danger',
      },
      {
        timeframe: 'month',
        text: 'Genera deuda de horas extra. Complica el próximo ciclo.',
        tone: 'warning',
      },
    ],
    rationale: 'Cubre el turno, pero genera +4h de horas extra que superan el límite del convenio colectivo.',
    legalNote: 'Supera el techo semanal de horas extra según convenio colectivo.',
  },
  {
    id: 'opt-split',
    nurseName: 'María + Sara',
    specialty: 'ICU',
    status: 'fragile',
    coverage: 'full',
    isAgentChoice: false,
    consequences: [
      {
        timeframe: 'today',
        text: 'UCI cubierta mediante turno dividido.',
        tone: 'success',
      },
      {
        timeframe: 'week',
        text: 'Ambas cerca del techo semanal — sin margen de cobertura.',
        tone: 'warning',
      },
      {
        timeframe: 'month',
        text: 'Cualquier nueva ausencia esta semana no tendría solución fácil.',
        tone: 'warning',
      },
    ],
  },
]

export const mockValidationPreview: ValidationPreview = {
  whatChanges:
    'Se asigna el turno a Carmen. Puede aceptarlo o rechazarlo con causa justificada.',
  whyViable:
    'Respeta su descanso y no supera jornada. Sin conflicto de convenio.',
  whatDoesntChange:
    'El resto del plan de la semana queda intacto. Sin efecto dominó.',
  resultingDebt:
    'Si Carmen acepta: plan estable, margen para 1 incidente más esta semana.',
  affected: 'Solo Carmen Ruiz.',
}
