import type { Incident, CoverageOption, ValidationPreview, WeeklyPlan, MonthlyPlan } from '../types'

export const mockIncident: Incident = {
  id: 'inc-001',
  nurseName: 'Laura García',
  avatarSrc: '/avatars/laura-garcia.png',
  unit: 'UCI',
  shiftType: 'night',
  startTime: '22:00',
  endTime: '06:00',
  startsInHours: 4,
  criticality: 'high',
  reason: 'Baja médica',
  unitMinStaff: 4,
  currentStaff: 3,
  reserve: 1,
}

export const mockOptions: CoverageOption[] = [
  {
    id: 'opt-carmen',
    nurseName: 'Carmen Ruiz',
    avatarSrc: '/avatars/carmen-ruiz.png',
    specialty: 'UCI',
    status: 'recommended',
    coverage: 'full',
    isAgentChoice: true,
    rationale: 'Cubre el turno sin horas extra y con la misma especialidad. Consume la reserva semanal — es el menor impacto posible.',
    consequences: [
      {
        timeframe: 'today',
        text: 'UCI con dotación completa 4/4.',
        tone: 'success',
      },
      {
        timeframe: 'week',
        text: 'Reserva 0. Plan semanal frágil — sin margen para otra ausencia.',
        tone: 'warning',
      },
      {
        timeframe: 'month',
        text: 'Sin reserva hasta fin de semana. Cualquier nueva ausencia complica el plan.',
        tone: 'warning',
      },
    ],
  },
  {
    id: 'opt-ana',
    nurseName: 'Ana Torres',
    avatarSrc: '/avatars/ana-torres.png',
    specialty: 'UCI',
    status: 'cost',
    coverage: 'full',
    isAgentChoice: false,
    rationale: 'Cubre el turno, pero genera +4h de horas extra que superan el límite del convenio.',
    legalNote: 'Supera el techo semanal de horas extra según convenio colectivo.',
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
        text: 'Genera deuda de horas extra. Complica el próximo ciclo de planificación.',
        tone: 'warning',
      },
    ],
  },
  {
    id: 'opt-split',
    nurseName: 'María L. + Sergio M.',
    avatarSrcs: ['/avatars/maria-lopez.png', '/avatars/sergio-martinez.png'],
    specialty: 'UCI',
    status: 'fragile',
    coverage: 'full',
    isAgentChoice: false,
    rationale: 'Turno dividido. Cubre la noche pero agota dos márgenes a la vez.',
    consequences: [
      {
        timeframe: 'today',
        text: 'UCI cubierta mediante turno dividido.',
        tone: 'success',
      },
      {
        timeframe: 'week',
        text: 'Ambos cerca del techo semanal — sin margen de cobertura.',
        tone: 'warning',
      },
      {
        timeframe: 'month',
        text: 'Agota dos reservas a la vez. Cualquier nueva ausencia no tiene solución fácil.',
        tone: 'warning',
      },
    ],
  },
]

export const mockWeeklyPlan: WeeklyPlan = {
  unitLabel: 'UCI Noche',
  planStatus: 'fragile',
  days: [
    { label: 'Lun 2',  reserve: 2, isToday: false },
    { label: 'Mar 3',  reserve: 1, isToday: false },
    { label: 'Mié 4',  reserve: 1, isToday: true, projectedReserve: 0 },
    { label: 'Jue 5',  reserve: 0, isToday: false },
    { label: 'Vie 6',  reserve: 1, isToday: false },
    { label: 'Sáb 7',  reserve: 2, isToday: false },
    { label: 'Dom 8',  reserve: 2, isToday: false },
  ],
  footnote:
    'Seleccionando la opción recomendada, hoy y el jueves quedarían sin reserva. La semana pierde su colchón ante un nuevo imprevisto.',
}

export const mockWeeklyPlanAna: WeeklyPlan = {
  unitLabel: 'UCI Noche',
  planStatus: 'stable',
  days: [
    { label: 'Lun 2',  reserve: 2, isToday: false },
    { label: 'Mar 3',  reserve: 1, isToday: false },
    { label: 'Mié 4',  reserve: 1, isToday: true },
    { label: 'Jue 5',  reserve: 0, isToday: false },
    { label: 'Vie 6',  reserve: 1, isToday: false },
    { label: 'Sáb 7',  reserve: 2, isToday: false },
    { label: 'Dom 8',  reserve: 2, isToday: false },
  ],
  footnote:
    'La reserva del plan no se ve afectada. El riesgo de Ana es el exceso de jornada, no el plan.',
}

export const mockWeeklyPlanConfirmed: WeeklyPlan = {
  unitLabel: 'UCI Noche',
  planStatus: 'fragile',
  planStatusLabel: 'Frágil',
  days: [
    { label: 'Lun 2',  reserve: 2, isToday: false },
    { label: 'Mar 3',  reserve: 1, isToday: false },
    { label: 'Mié 4',  reserve: 0, isToday: true },
    { label: 'Jue 5',  reserve: 0, isToday: false },
    { label: 'Vie 6',  reserve: 1, isToday: false },
    { label: 'Sáb 7',  reserve: 2, isToday: false },
    { label: 'Dom 8',  reserve: 2, isToday: false },
  ],
  footnote:
    'Hoy y el jueves están sin reserva. Cualquier nuevo imprevisto esta semana no tendrá cobertura automática.',
}

// June 2026: day 1 falls on Sunday → firstWeekday=6 (Mon-start grid).
// Today = Wed 4 (today-no-reserve), Thu 5 (no-reserve). All other days have margin.
export const mockMonthlyPlan: MonthlyPlan = {
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

export const mockValidationPreview: ValidationPreview = {
  whatChanges:
    'Se asigna el turno a Carmen. Puede aceptarlo o rechazarlo con causa justificada.',
  whyViable:
    'Respeta su descanso y no supera jornada. Sin conflicto de convenio.',
  whatDoesntChange:
    'El resto del plan de la semana queda intacto. Sin efecto dominó.',
  resultingDebt:
    'Plan semanal frágil. Reserva 0 hasta fin de semana — sin margen si hay otra ausencia.',
  affected: 'Carmen Ruiz (asignación pendiente aceptación). Laura García (baja registrada).',
}
