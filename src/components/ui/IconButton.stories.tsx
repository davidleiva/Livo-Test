import type { Meta, StoryObj } from '@storybook/react'
import { X, ChevronLeft, Search, Settings } from 'lucide-react'
import IconButton from './IconButton'

const meta = {
  title: 'UI/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['ghost', 'subtle'] },
    size:    { control: 'select', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Ghost: Story = {
  args: { icon: X, label: 'Cerrar', variant: 'ghost' },
}

export const Subtle: Story = {
  args: { icon: Settings, label: 'Configuración', variant: 'subtle' },
}

export const SmallGhost: Story = {
  args: { icon: X, label: 'Cerrar', variant: 'ghost', size: 'sm' },
}

export const SmallSubtle: Story = {
  args: { icon: Search, label: 'Buscar', variant: 'subtle', size: 'sm' },
}

export const Back: Story = {
  args: { icon: ChevronLeft, label: 'Volver', variant: 'ghost' },
}
