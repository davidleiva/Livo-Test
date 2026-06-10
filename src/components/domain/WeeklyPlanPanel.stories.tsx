import type { Meta, StoryObj } from '@storybook/react'
import WeeklyPlanPanel from './WeeklyPlanPanel'
import { mockWeeklyPlan, mockWeeklyPlanAna, mockWeeklyPlanConfirmed } from '../../data'

const meta = {
  title: 'Domain/WeeklyPlanPanel',
  component: WeeklyPlanPanel,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof WeeklyPlanPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Fragile: Story = {
  args: { ...mockWeeklyPlan },
}

export const Stable: Story = {
  args: { ...mockWeeklyPlanAna },
}

export const Confirmed: Story = {
  args: { ...mockWeeklyPlanConfirmed },
}
