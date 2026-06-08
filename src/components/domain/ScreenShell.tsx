import { ArrowLeft } from 'lucide-react'
import { IconButton } from '../ui'

export interface ScreenShellProps {
  title?: string
  subtitle?: string
  onBack?: () => void
  children?: React.ReactNode
  actionBar?: React.ReactNode
  /** Use on screens that need extra width for comparison layouts (md:max-w-3xl vs default md:max-w-xl) */
  wide?: boolean
}

export default function ScreenShell({
  title = 'Incidencia',
  subtitle,
  onBack,
  children,
  actionBar,
  wide = false,
}: ScreenShellProps) {
  return (
    /*
     * Outer: full viewport height on mobile, centered card on desktop.
     * flex-col + h-svh means header/footer are fixed, middle scrolls.
     */
    <div className="
      flex flex-col h-svh bg-surface-alt
      md:items-center md:justify-start md:py-8 md:px-4
    ">
      {/* ── Desktop card wrapper ── */}
      <div className={[
        'flex flex-col flex-1 w-full bg-surface overflow-hidden',
        'md:flex-none md:w-full md:rounded-xl md:border md:border-line md:shadow-sm md:max-h-[90vh]',
        wide ? 'md:max-w-3xl' : 'md:max-w-xl',
      ].join(' ')}>

        {/* ── Header ── */}
        <header className="
          flex-shrink-0 flex items-center gap-3
          px-4 py-3 border-b border-line bg-surface
        ">
          {onBack && (
            <IconButton
              icon={ArrowLeft}
              label="Volver"
              variant="ghost"
              size="sm"
              onClick={onBack}
            />
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-title font-semibold text-foreground truncate leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-small text-foreground-muted truncate mt-px">{subtitle}</p>
            )}
          </div>
        </header>

        {/* ── Scrollable content ── */}
        <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {children}
        </main>

        {/* ── Action bar — non-scrolling ── */}
        {actionBar && (
          <div className="flex-shrink-0">
            {actionBar}
          </div>
        )}

      </div>
    </div>
  )
}
