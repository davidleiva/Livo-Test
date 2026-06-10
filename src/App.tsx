import './index.css'
import { useState } from 'react'
import Moment1 from './screens/Moment1'
import Moment2 from './screens/Moment2'
import Moment3 from './screens/Moment3'
import LayoutDemo from './screens/LayoutDemo'
import Moment2Layout from './screens/Moment2Layout'
import Moment3Layout from './screens/Moment3Layout'

type Screen = 'moment1' | 'moment2' | 'moment3' | 'layout' | 'm2layout' | 'm3layout'

// ── Navigation ───────────────────────────────────────────────────────────────

/*
 * Designed flow:
 *   Moment1 "Ver por qué"   → moment2
 *   Moment1 "Validar"       → moment3
 *   Moment2 back            → moment1
 *   Moment2 "Validar Carmen"→ moment3
 *   Moment3 back            → moment2
 *   Moment3 success restart → moment1
 *   Layout embedded actions → moment2 / moment3 (breaks out of layout to full screen)
 *
 * key={screen} on the wrapper forces remount on navigation:
 *   - resets Moment3's local validated state
 *   - resets scroll position in ScreenShell's overflow-y-auto main
 *   - triggers the fade-in animation
 */

// ── Presentation screen selector ─────────────────────────────────────────────

const SCREENS: { key: Screen; label: string; short: string }[] = [
  { key: 'moment1',  label: '1 · Incidente', short: 'M1' },
  { key: 'moment2',  label: '2 · Comparar',  short: 'M2' },
  { key: 'moment3',  label: '3 · Validar',   short: 'M3' },
  { key: 'layout',   label: '4 · Layout',    short: 'L'  },
  { key: 'm2layout', label: '5 · M2',        short: '5'  },
  { key: 'm3layout', label: '6 · M3',        short: '6'  },
]

function ScreenSelector({
  current,
  onSelect,
}: {
  current: Screen
  onSelect: (s: Screen) => void
}) {
  const [open, setOpen] = useState(true)

  const currentShort = SCREENS.find((s) => s.key === current)?.short ?? current

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Mostrar controles demo"
        aria-label="Mostrar selector de pantallas"
        className="fixed bottom-4 right-4 z-50 px-2.5 py-1 rounded-lg bg-surface/80 backdrop-blur-sm border border-line shadow-sm text-label font-semibold text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
      >
        {currentShort}
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-surface/92 backdrop-blur-sm border border-line rounded-xl shadow-sm overflow-hidden min-w-[140px]">
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
  const [screen, setScreen]       = useState<Screen>('moment1')
  const [m2OptionId, setM2Option] = useState('opt-carmen')

  function handleNavigateToM2(optionId: string) {
    setM2Option(optionId)
    setScreen('m2layout')
  }

  function handleNavigateToM3() {
    setScreen('m3layout')
  }

  return (
    <>
      {/* key forces remount → resets scroll + local state + triggers animation */}
      <div key={screen} className="animate-screen-enter">
        {screen === 'moment1'  && <Moment1      onNavigate={setScreen} />}
        {screen === 'moment2'  && <Moment2      onNavigate={setScreen} />}
        {screen === 'moment3'  && <Moment3      onNavigate={setScreen} />}
        {screen === 'layout'   && (
          <LayoutDemo
            onNavigateToM2={handleNavigateToM2}
            onNavigateToM3={handleNavigateToM3}
          />
        )}
        {screen === 'm2layout' && (
          <Moment2Layout
            initialOptionId={m2OptionId}
            onBack={() => setScreen('layout')}
            onNavigateToM3={handleNavigateToM3}
          />
        )}
        {screen === 'm3layout' && (
          <Moment3Layout
            onGoToIncidencias={() => setScreen('moment1')}
          />
        )}
      </div>

      <ScreenSelector current={screen} onSelect={setScreen} />
    </>
  )
}
