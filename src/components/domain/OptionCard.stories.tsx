import type { Meta, StoryObj } from '@storybook/react'
import OptionCard from './OptionCard'
import { mockOptions } from '../../data'

const meta = {
  title: 'Domain/OptionCard',
  component: OptionCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof OptionCard>

export default meta
type Story = StoryObj<typeof meta>

const carmen = mockOptions.find(o => o.id === 'opt-carmen')!
const ana    = mockOptions.find(o => o.id === 'opt-ana')!
const split  = mockOptions.find(o => o.id === 'opt-split')!

export const Recommended: Story = {
  args: { option: carmen },
}

export const WithCost: Story = {
  args: {
    option: {
      ...ana,
      legalNote: 'Supera jornada semanal por convenio. Ana puede rechazar con causa justificada.',
    },
  },
}

export const PlanFragile: Story = {
  args: { option: split },
}

export const Selectable: Story = {
  args: { option: carmen, onSelect: (id) => console.log('selected', id) },
}
