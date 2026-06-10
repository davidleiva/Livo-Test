import type { Meta, StoryObj } from '@storybook/react'
import StickyActionBar from './StickyActionBar'

const meta = {
  title: 'Domain/StickyActionBar',
  component: StickyActionBar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof StickyActionBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomLabel: Story = {
  args: {
    primaryLabel: 'Validar Carmen Ruiz',
    microcopy: 'Al validar, Carmen Ruiz recibirá la asignación. Tiene derecho a rechazarla con causa justificada.',
  },
}

export const TwoSecondaryActions: Story = {
  args: {
    primaryLabel: 'Validar asignación',
    secondaryActions: [
      { label: 'Guardar borrador', onClick: () => {} },
      { label: 'Escalar incidencia', onClick: () => {} },
    ],
    microcopy: 'Al validar, la enfermera recibirá una notificación inmediata.',
  },
}

export const NoSecondaryActions: Story = {
  args: {
    primaryLabel: 'Confirmar',
    secondaryActions: [],
    microcopy: 'Esta acción no se puede deshacer.',
  },
}
