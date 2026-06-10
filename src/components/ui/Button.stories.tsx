import type { Meta, StoryObj } from '@storybook/react'
import { Plus, ArrowRight, Trash2 } from 'lucide-react'
import Button from './Button'

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant:   { control: 'select', options: ['primary', 'secondary', 'danger'] },
    size:      { control: 'select', options: ['md', 'lg'] },
    fullWidth: { control: 'boolean' },
    disabled:  { control: 'boolean' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: 'Validar asignación', variant: 'primary' },
}

export const Secondary: Story = {
  args: { children: 'Guardar borrador', variant: 'secondary' },
}

export const Danger: Story = {
  args: { children: 'Eliminar incidencia', variant: 'danger' },
}

export const Large: Story = {
  args: { children: 'Validar asignación', size: 'lg' },
}

export const WithLeftIcon: Story = {
  args: { children: 'Añadir enfermera', leftIcon: Plus },
}

export const WithRightIcon: Story = {
  args: { children: 'Ver detalles', rightIcon: ArrowRight, variant: 'secondary' },
}

export const DangerWithIcon: Story = {
  args: { children: 'Eliminar', leftIcon: Trash2, variant: 'danger' },
}

export const FullWidth: Story = {
  parameters: { layout: 'padded' },
  args: { children: 'Validar asignación', fullWidth: true },
}

export const Disabled: Story = {
  args: { children: 'Validar asignación', disabled: true },
}

export const DisabledSecondary: Story = {
  args: { children: 'Guardar borrador', variant: 'secondary', disabled: true },
}
