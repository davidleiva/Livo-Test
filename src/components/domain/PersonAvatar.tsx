import { Plus, Minus } from 'lucide-react'

export interface PersonAvatarProps {
  initials?: string
  imageSrc?: string
  name?: string
  subtitle?: string
  /** 'out' = absence (amber badge, minus); 'in' = incorporation (mint badge, plus) */
  badge?: 'out' | 'in' | 'none'
}

// Circle background: 'in' uses mint family to signal incorporation;
// 'out' and 'none' use neutral — absence is never shown in red (not an error).
const circleClass: Record<NonNullable<PersonAvatarProps['badge']>, string> = {
  in:   'bg-mint-soft text-info',
  out:  'bg-surface-alt text-foreground-muted',
  none: 'bg-surface-alt text-foreground-muted',
}

// Badge dot: amber (#EF9F27) for absence, mint (#2DD4A7) for incorporation.
// Solid color so it reads clearly at 18px.
const badgeDotClass: Record<'out' | 'in', string> = {
  out: 'bg-warning-border',  // #EF9F27 — amber, not red
  in:  'bg-mint',            // #2DD4A7 — teal
}

export default function PersonAvatar({
  initials = 'AB',
  imageSrc,
  name,
  subtitle,
  badge = 'none',
}: PersonAvatarProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Avatar circle + optional status badge */}
      <div className="relative flex-shrink-0">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center select-none overflow-hidden ${circleClass[badge]}`}
          aria-hidden="true"
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-small font-semibold">{initials}</span>
          )}
        </div>

        {badge !== 'none' && (
          <div
            className={[
              'absolute -bottom-0.5 -right-0.5',
              'w-[18px] h-[18px] rounded-full',
              'flex items-center justify-center',
              'border-2 border-surface',
              badgeDotClass[badge],
            ].join(' ')}
            aria-hidden="true"
          >
            {badge === 'out'
              ? <Minus size={8} strokeWidth={3} className="text-white" />
              : <Plus  size={8} strokeWidth={3} className="text-white" />
            }
          </div>
        )}
      </div>

      {/* Optional text */}
      {(name || subtitle) && (
        <div className="min-w-0">
          {name    && <p className="text-body font-medium text-foreground leading-tight">{name}</p>}
          {subtitle && <p className="text-small text-foreground-muted mt-px leading-snug">{subtitle}</p>}
        </div>
      )}
    </div>
  )
}
