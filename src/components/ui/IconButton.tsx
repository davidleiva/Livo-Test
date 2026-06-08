import type { LucideIcon } from 'lucide-react'

export interface IconButtonProps {
  icon: LucideIcon
  label: string
  onClick?: () => void
  variant?: 'ghost' | 'subtle'
  size?: 'sm' | 'md'
}

const variantClasses: Record<NonNullable<IconButtonProps['variant']>, string> = {
  ghost:  'hover:bg-surface-alt text-foreground-muted hover:text-foreground',
  subtle: 'bg-surface-alt      text-foreground-muted hover:bg-line',
}

const sizeClasses: Record<NonNullable<IconButtonProps['size']>, { wrapper: string; icon: number }> = {
  sm: { wrapper: 'w-8  h-8',  icon: 16 },
  md: { wrapper: 'w-11 h-11', icon: 20 },
}

export default function IconButton({
  icon: Icon,
  label,
  onClick,
  variant = 'ghost',
  size = 'md',
}: IconButtonProps) {
  const { wrapper, icon } = sizeClasses[size]

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={[
        'inline-flex items-center justify-center rounded-md transition-colors cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        wrapper,
      ].join(' ')}
    >
      <Icon size={icon} strokeWidth={2} aria-hidden="true" />
    </button>
  )
}
