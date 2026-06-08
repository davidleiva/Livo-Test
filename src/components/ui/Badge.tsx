export interface BadgeProps {
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'mint'
  size?: 'sm' | 'md'
  outlined?: boolean
  children?: React.ReactNode
}

const filledClasses: Record<NonNullable<BadgeProps['tone']>, string> = {
  neutral: 'bg-surface-alt  text-foreground-muted',
  success: 'bg-success-bg   text-success',
  warning: 'bg-warning-bg   text-warning',
  danger:  'bg-danger-bg    text-danger',
  mint:    'bg-mint-soft    text-info',
}

const outlinedClasses: Record<NonNullable<BadgeProps['tone']>, string> = {
  neutral: 'border border-line           text-foreground-muted bg-transparent',
  success: 'border border-success-border text-success          bg-transparent',
  warning: 'border border-warning-border text-warning          bg-transparent',
  danger:  'border border-danger-border  text-danger           bg-transparent',
  mint:    'border border-info-border    text-info             bg-transparent',
}

const sizeClasses: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'px-2   py-0.5 text-label  tracking-wide',
  md: 'px-2.5 py-1   text-small',
}

export default function Badge({
  tone = 'neutral',
  size = 'sm',
  outlined = false,
  children = 'Badge',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full font-medium whitespace-nowrap',
        outlined ? outlinedClasses[tone] : filledClasses[tone],
        sizeClasses[size],
      ].join(' ')}
    >
      {children}
    </span>
  )
}
