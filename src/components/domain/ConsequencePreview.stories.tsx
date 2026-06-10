import type { Meta, StoryObj } from '@storybook/react'
import ConsequencePreview from './ConsequencePreview'

const meta = {
  title: 'Domain/ConsequencePreview',
  component: ConsequencePreview,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof ConsequencePreview>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDebt: Story = {
  args: {
    preview: {
      whatChanges:      'Carmen Ruiz cubre el turno UCI noche 22:00–06:00 en sustitución de Laura García.',
      whyViable:        'Dentro de jornada contratada. Respeta descanso mínimo de 12h. Sin conflicto con convenio.',
      whatDoesntChange: 'El resto del plan semanal queda intacto. Ninguna otra enfermera se ve afectada.',
      resultingDebt:    'Plan frágil hasta el jueves. Sin reserva ante nuevos imprevistos esta semana.',
      affected:         'Carmen Ruiz (pendiente aceptación). Laura García (baja registrada).',
    },
  },
}

export const NoDebt: Story = {
  args: {
    preview: {
      whatChanges:      'Carmen Ruiz cubre el turno UCI noche 22:00–06:00.',
      whyViable:        'Dentro de jornada contratada. Sin horas extra. Sin conflicto legal.',
      whatDoesntChange: 'Plan semanal estable. Reserva disponible para el resto de la semana.',
      resultingDebt:    'Sin deuda. Margen del plan mensual conservado.',
      affected:         'Carmen Ruiz (pendiente aceptación).',
    },
  },
}
