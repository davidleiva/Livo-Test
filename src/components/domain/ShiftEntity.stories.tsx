import type { Meta, StoryObj } from '@storybook/react'
import ShiftEntity from './ShiftEntity'

const meta = {
  title: 'Domain/ShiftEntity',
  component: ShiftEntity,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    shiftType: { control: 'select', options: ['morning', 'afternoon', 'night'] },
  },
} satisfies Meta<typeof ShiftEntity>

export default meta
type Story = StoryObj<typeof meta>

export const Understaffed: Story = {
  args: {
    unit: 'UCI',
    shiftType: 'night',
    startTime: '22:00',
    endTime: '06:00',
    staffing: { current: 3, required: 4 },
    reserve: 1,
  },
}

export const FullStaff: Story = {
  args: {
    unit: 'UCI',
    shiftType: 'night',
    staffing: { current: 4, required: 4 },
    reserve: 1,
  },
}

export const NoReserve: Story = {
  args: {
    unit: 'UCI',
    shiftType: 'night',
    staffing: { current: 4, required: 4 },
    reserve: 0,
  },
}

export const WithProjection: Story = {
  args: {
    unit: 'UCI',
    shiftType: 'night',
    staffing: { current: 3, required: 4 },
    reserve: 1,
    projected: {
      staffing: { current: 4, required: 4 },
      reserve: 0,
    },
  },
}

export const MorningShift: Story = {
  args: {
    unit: 'Urgencias',
    shiftType: 'morning',
    startTime: '08:00',
    endTime: '15:00',
    staffing: { current: 5, required: 5 },
    reserve: 2,
  },
}

export const AfternoonShift: Story = {
  args: {
    unit: 'Planta B',
    shiftType: 'afternoon',
    startTime: '15:00',
    endTime: '22:00',
    staffing: { current: 3, required: 4 },
    reserve: 0,
  },
}
