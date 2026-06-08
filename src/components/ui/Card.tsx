import type { ShiftType } from '../../types'

export interface CardProps {
  shiftType?: ShiftType
  selected?: boolean
  padding?: 'sm' | 'md'
  onClick?: () => void
  children?: React.ReactNode
}

const shiftBarClass: Record<ShiftType, string> = {
  morning:   'bg-shift-morning',
  afternoon: 'bg-shift-afternoon',
  night:     'bg-shift-night',
}

const paddingClass: Record<NonNullable<CardProps['padding']>, string> = {
  sm: 'p-3',
  md: 'p-4',
}

export default function Card({
  shiftType,
  selected = false,
  padding = 'md',
  onClick,
  children = <p className="text-foreground-subtle text-body">Card content</p>,
}: CardProps) {
  const interactive = onClick !== undefined

  return (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick() } : undefined}
      className={[
        'flex overflow-hidden rounded-lg border bg-surface transition-colors',
        selected
          ? 'border-mint shadow-sm'
          : 'border-line',
        interactive && !selected
          ? 'hover:border-foreground-subtle cursor-pointer'
          : '',
        interactive
          ? 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1'
          : '',
      ].filter(Boolean).join(' ')}
    >
      {shiftType && (
        <div className={`w-1.5 flex-shrink-0 ${shiftBarClass[shiftType]}`} aria-hidden="true" />
      )}
      <div className={`flex-1 min-w-0 ${paddingClass[padding]}`}>
        {children}
      </div>
    </div>
  )
}
