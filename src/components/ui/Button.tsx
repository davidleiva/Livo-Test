import type { LucideIcon } from 'lucide-react'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'md' | 'lg'
  fullWidth?: boolean
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:   'bg-brand-teal text-white hover:bg-brand-teal-hover',
  secondary: 'border border-line text-foreground hover:bg-surface-alt',
  danger:    'border border-danger-border text-danger hover:bg-danger-bg',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  md: 'px-4 py-2.5 text-body   min-h-[44px]',
  lg: 'px-5 py-3   text-body-lg min-h-[44px]',
}

const iconSize: Record<NonNullable<ButtonProps['size']>, number> = {
  md: 16,
  lg: 18,
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  children = 'Button',
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-md font-medium',
        'transition-colors cursor-pointer select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-1',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
      ].filter(Boolean).join(' ')}
    >
      {LeftIcon && <LeftIcon size={iconSize[size]} strokeWidth={2} aria-hidden="true" />}
      {children}
      {RightIcon && <RightIcon size={iconSize[size]} strokeWidth={2} aria-hidden="true" />}
    </button>
  )
}
