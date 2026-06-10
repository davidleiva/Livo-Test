import { Plus, Minus } from 'lucide-react'

type AvatarSize = 'sm' | 'md' | 'lg'

export interface PersonAvatarPerson {
  initials?: string
  imageSrc?: string
}

export interface PersonAvatarProps {
  initials?: string
  imageSrc?: string
  people?: PersonAvatarPerson[]
  name?: string
  subtitle?: string
  /** 'out' = absence (amber badge, minus); 'in' = incorporation (mint badge, plus) */
  badge?: 'out' | 'in' | 'none'
  size?: AvatarSize
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

const sizeClass: Record<AvatarSize, {
  slot: string
  circle: string
  text: string
  badge: string
  badgeIcon: number
  groupBack: string
  groupFront: string
  groupBadge: string
}> = {
  sm: {
    slot: 'w-8 h-8',
    circle: 'w-8 h-8',
    text: 'text-small',
    badge: 'w-[18px] h-[18px]',
    badgeIcon: 8,
    groupBack: '-left-[7px]',
    groupFront: 'left-[7px]',
    groupBadge: 'left-[24px] top-[15px]',
  },
  md: {
    slot: 'w-10 h-10',
    circle: 'w-10 h-10',
    text: 'text-small',
    badge: 'w-[18px] h-[18px]',
    badgeIcon: 8,
    groupBack: '-left-2',
    groupFront: 'left-2',
    groupBadge: 'left-[34px] top-[21px]',
  },
  lg: {
    slot: 'w-12 h-12',
    circle: 'w-12 h-12',
    text: 'text-body-lg',
    badge: 'w-[22px] h-[22px]',
    badgeIcon: 10,
    groupBack: '-left-2.5',
    groupFront: 'left-2.5',
    groupBadge: 'left-[38px] top-[25px]',
  },
}

function AvatarFace({
  initials = 'AB',
  imageSrc,
  className,
  textClass,
}: {
  initials?: string
  imageSrc?: string
  className: string
  textClass: string
}) {
  return (
    <div
      className={`${className} rounded-full flex items-center justify-center select-none overflow-hidden bg-surface-alt text-foreground-muted`}
      aria-hidden="true"
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          className="w-full h-full object-cover"
        />
      ) : (
        <span className={`${textClass} font-semibold`}>{initials}</span>
      )}
    </div>
  )
}

export default function PersonAvatar({
  initials = 'AB',
  imageSrc,
  people,
  name,
  subtitle,
  badge = 'none',
  size = 'md',
}: PersonAvatarProps) {
  const config = sizeClass[size]
  const groupPeople = people?.slice(0, 2)
  const isGroup = Boolean(groupPeople && groupPeople.length > 1)
  const singlePerson = groupPeople?.[0]

  return (
    <div className="flex items-center gap-3">
      {/* Avatar circle + optional status badge */}
      <div className={`relative flex-shrink-0 ${config.slot}`}>
        {isGroup ? (
          <>
            <AvatarFace
              initials={groupPeople?.[0]?.initials}
              imageSrc={groupPeople?.[0]?.imageSrc}
              className={`absolute top-0 ${config.groupBack} ${config.circle} border-2 border-brand-teal/30 z-0 shadow-sm`}
              textClass={config.text}
            />
            <AvatarFace
              initials={groupPeople?.[1]?.initials}
              imageSrc={groupPeople?.[1]?.imageSrc}
              className={`absolute top-0 ${config.groupFront} ${config.circle} border-2 border-brand-teal/30 z-10 shadow-sm`}
              textClass={config.text}
            />
          </>
        ) : (
          <div
            className={`${config.circle} rounded-full flex items-center justify-center select-none overflow-hidden ${circleClass[badge]}`}
            aria-hidden="true"
          >
            {(singlePerson?.imageSrc ?? imageSrc) ? (
              <img
                src={singlePerson?.imageSrc ?? imageSrc}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <span className={`${config.text} font-semibold`}>{singlePerson?.initials ?? initials}</span>
            )}
          </div>
        )}

        {badge !== 'none' && (
          <div
            className={[
              'absolute rounded-full',
              'flex items-center justify-center',
              'border-2 border-surface z-20',
              isGroup ? config.groupBadge : '-bottom-0.5 -right-0.5',
              config.badge,
              badgeDotClass[badge],
            ].join(' ')}
            aria-hidden="true"
          >
            {badge === 'out'
              ? <Minus size={config.badgeIcon + 1} strokeWidth={3} className="text-white" />
              : <Plus  size={config.badgeIcon} strokeWidth={3} className="text-white" />
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
