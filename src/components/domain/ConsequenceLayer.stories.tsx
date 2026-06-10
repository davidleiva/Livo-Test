import type { Meta, StoryObj } from '@storybook/react'
import ConsequenceLayer from './ConsequenceLayer'

const meta = {
  title: 'Domain/ConsequenceLayer',
  component: ConsequenceLayer,
  tags: ['autodocs'],
  argTypes: {
    layer: { control: 'object' },
  },
} satisfies Meta<typeof ConsequenceLayer>

export default meta
type Story = StoryObj<typeof meta>

export const TodaySuccess: Story = {
  args: { layer: { timeframe: 'today', text: 'Turno cubierto 4/4. Sin coste.', tone: 'success' } },
}

export const TodayWarning: Story = {
  args: { layer: { timeframe: 'today', text: 'Turno cubierto solo si ambos aceptan.', tone: 'warning' } },
}

export const WeekWarning: Story = {
  args: { layer: { timeframe: 'week', text: 'Reserva 1 → 0. La semana queda sin colchón.', tone: 'warning' } },
}

export const WeekDanger: Story = {
  args: { layer: { timeframe: 'week', text: '+4h extra. Supera el límite del convenio colectivo.', tone: 'danger' } },
}

export const MonthSuccess: Story = {
  args: { layer: { timeframe: 'month', text: 'Impacto mínimo. Solo 1 día sin reserva de 22 laborables.', tone: 'success' } },
}

export const MonthNeutral: Story = {
  args: { layer: { timeframe: 'month', text: 'Sin impacto adicional en el plan mensual.', tone: 'neutral' } },
}

export const StackedRows: Story = {
  render: () => (
    <div className="w-80">
      <ConsequenceLayer layer={{ timeframe: 'today', text: 'Turno cubierto 4/4. Sin coste.', tone: 'success' }} />
      <ConsequenceLayer layer={{ timeframe: 'week',  text: 'Reserva 1 → 0. La semana queda sin colchón.', tone: 'warning' }} />
      <ConsequenceLayer layer={{ timeframe: 'month', text: 'Impacto mínimo. Solo 1 día sin reserva.', tone: 'success' }} />
    </div>
  ),
}
