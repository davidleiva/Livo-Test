import type { Meta, StoryObj } from '@storybook/react'
import ScreenShell from './ScreenShell'
import StickyActionBar from './StickyActionBar'

const meta = {
  title: 'Domain/ScreenShell',
  component: ScreenShell,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof ScreenShell>

export default meta
type Story = StoryObj<typeof meta>

const sampleContent = (
  <div className="space-y-3">
    <p className="text-body text-foreground-muted">
      Este es el contenido principal de la pantalla. En un caso real aquí aparecería la
      tarjeta de incidente, el agente y las opciones de decisión.
    </p>
    <p className="text-body text-foreground-muted">
      El área de scroll funciona de forma independiente del header y del action bar.
    </p>
  </div>
)

export const Default: Story = {
  args: { title: 'Incidencia activa', children: sampleContent },
}

export const WithBack: Story = {
  args: { title: 'Por qué Carmen', onBack: () => {}, children: sampleContent },
}

export const WithSubtitle: Story = {
  args: {
    title: 'Por qué Carmen',
    subtitle: 'Razonamiento del agente',
    onBack: () => {},
    children: sampleContent,
  },
}

export const WithActionBar: Story = {
  args: {
    title: 'Incidencia activa',
    children: sampleContent,
    actionBar: <StickyActionBar />,
  },
}

export const Wide: Story = {
  args: {
    title: 'Comparar opciones',
    subtitle: 'Razonamiento del agente',
    onBack: () => {},
    wide: true,
    children: sampleContent,
  },
}
