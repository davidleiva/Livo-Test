import './index.css'
import { useState } from 'react'
import Moment1 from './screens/Moment1'
import Moment2 from './screens/Moment2'
import Moment3 from './screens/Moment3'

type Screen = 'moment1' | 'moment2' | 'moment3'

// ── Navigation ───────────────────────────────────────────────────────────────

/*
 * Designed flow:
 *   Moment1 "Ver por qué"   → moment2
 *   Moment1 "Validar"       → moment3
 *   Moment2 back            → moment1
 *   Moment2 "Validar Carmen"→ moment3
 *   Moment3 back            → moment2
 *   Moment3 success restart → moment1
 *
 * key={screen} on the wrapper forces remount on navigation:
 *   - resets Moment3's local validated state
 *   - resets scroll position in ScreenShell's overflow-y-auto main
 *   - triggers the fade-in animation
 */

// ── Presentation screen selector ─────────────────────────────────────────────

const SCREENS: { key: Screen; label: string }[] = [
  { key: 'moment1', label: '1 · Incidente' },
  { key: 'moment2', label: '2 · Comparar'  },
  { key: 'moment3', label: '3 · Validar'   },
]

function ScreenSelector({
  current,
  onSelect,
}: {
  current: Screen
  onSelect: (s: Screen) => void
}) {
  const [open, setOpen] = useState(true)

  const currentNum = current.replace('moment', 'M')

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Mostrar controles demo"
        aria-label="Mostrar selector de pantallas"
        className="fixed bottom-4 left-4 z-50 px-2.5 py-1 rounded-lg bg-surface/80 backdrop-blur-sm border border-line shadow-sm text-label font-semibold text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
      >
        {currentNum}
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-surface/92 backdrop-blur-sm border border-line rounded-xl shadow-sm overflow-hidden min-w-[140px]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-3 pt-2.5 pb-1.5 border-b border-line">
        <span className="text-label font-semibold uppercase tracking-wide text-foreground-subtle">
          Demo
        </span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Ocultar selector"
          className="text-foreground-subtle hover:text-foreground leading-none cursor-pointer text-base"
        >
          ×
        </button>
      </div>

      {/* Screen buttons */}
      <div className="flex flex-col gap-0.5 p-1.5">
        {SCREENS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            className={[
              'text-left px-2.5 py-1.5 rounded-md text-small transition-colors cursor-pointer whitespace-nowrap',
              current === key
                ? 'bg-info-bg text-info font-semibold'
                : 'text-foreground-muted hover:text-foreground hover:bg-surface-alt',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>('moment1')

  return (
    <>
      {/* key forces remount → resets scroll + local state + triggers animation */}
      <div key={screen} className="animate-screen-enter">
        {screen === 'moment1' && <Moment1 onNavigate={setScreen} />}
        {screen === 'moment2' && <Moment2 onNavigate={setScreen} />}
        {screen === 'moment3' && <Moment3 onNavigate={setScreen} />}
      </div>

      <ScreenSelector current={screen} onSelect={setScreen} />
    </>
  )
}
