export type ShiftType = 'morning' | 'afternoon' | 'night'

export type Criticality = 'high' | 'medium' | 'low'

export type PlanStability = 'stable' | 'fragile'

export type Coverage = 'full' | 'partial'

export type OptionStatus = 'recommended' | 'cost' | 'fragile'

export interface Incident {
  id: string
  nurseName: string
  avatarSrc?: string
  unit: string
  shiftType: ShiftType
  startTime: string
  endTime: string
  startsInHours: number
  criticality: Criticality
  reason: string
  unitMinStaff: number
  currentStaff: number
  reserve: number
}

export interface ConsequenceLayer {
  timeframe: 'today' | 'week' | 'month'
  text: string
  tone: 'neutral' | 'success' | 'warning' | 'danger'
}

export interface CoverageOption {
  id: string
  nurseName: string
  avatarSrc?: string
  avatarSrcs?: string[]
  specialty: string
  status: OptionStatus
  coverage: Coverage
  isAgentChoice: boolean
  consequences: ConsequenceLayer[]
  rationale?: string
  legalNote?: string
}

export interface ValidationPreview {
  whatChanges: string
  whyViable: string
  whatDoesntChange: string
  resultingDebt: string
  affected: string
}

export interface WeeklyPlanDay {
  label: string
  reserve: number
  isToday: boolean
  projectedReserve?: number
}

export interface WeeklyPlan {
  unitLabel: string
  planStatus: 'stable' | 'fragile'
  planStatusLabel?: string
  days: WeeklyPlanDay[]
  footnote: string
}

export interface MonthlyPlanDay {
  day: number
  state: 'margin' | 'no-reserve' | 'today-no-reserve'
}

export interface MonthlyPlan {
  monthLabel: string
  /** Overall monthly impact level → header pill */
  status: 'low' | 'medium' | 'high'
  /** Which weekday the 1st falls on, Monday-start (0 = Mon … 6 = Sun) */
  firstWeekday: number
  daysInMonth: number
  /** Only days with a non-default state need to be listed; rest default to 'margin' */
  days: MonthlyPlanDay[]
  footnote: string
}
