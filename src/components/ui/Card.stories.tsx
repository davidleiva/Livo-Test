import type { Meta, StoryObj } from '@storybook/react'
import Card from './Card'

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    shiftType: { control: 'select', options: [undefined, 'morning', 'afternoon', 'night'] },
    padding:   { control: 'select', options: ['sm', 'md'] },
    selected:  { control: 'boolean' },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

const content = (
  <div>
    <p className="text-body font-semibold text-foreground">UCI · Hospital Clínico</p>
    <p className="text-small text-foreground-muted mt-0.5">Turno Noche · 22:00–06:00</p>
  </div>
)

export const Default: Story = {
  args: { children: content },
}

export const MorningShift: Story = {
  args: { shiftType: 'morning', children: content },
}

export const AfternoonShift: Story = {
  args: { shiftType: 'afternoon', children: content },
}

export const NightShift: Story = {
  args: { shiftType: 'night', children: content },
}

export const Selected: Story = {
  args: { shiftType: 'night', selected: true, children: content },
}

export const Interactive: Story = {
  args: {
    shiftType: 'night',
    onClick: () => {},
    children: content,
  },
}

export const SmallPadding: Story = {
  args: { shiftType: 'morning', padding: 'sm', children: content },
}
