import './index.css'
import { useState } from 'react'
import Moment1 from './screens/Moment1'
import Moment2 from './screens/Moment2'
import Moment3 from './screens/Moment3'

type Screen = 'moment1' | 'moment2' | 'moment3'

export default function App() {
  const [screen, setScreen] = useState<Screen>('moment3')

  if (screen === 'moment1') return <Moment1 onNavigate={setScreen} />
  if (screen === 'moment2') return <Moment2 onNavigate={setScreen} />
  return <Moment3 onNavigate={setScreen} />
}
