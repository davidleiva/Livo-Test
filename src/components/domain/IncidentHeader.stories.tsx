import type { Meta, StoryObj } from '@storybook/react'
import IncidentHeader from './IncidentHeader'
import { mockIncident } from '../../data'

const meta = {
  title: 'Domain/IncidentHeader',
  component: IncidentHeader,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof IncidentHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const HighCriticality: Story = {
  args: { incident: mockIncident },
}

export const MediumCriticality: Story = {
  args: {
    incident: {
      ...mockIncident,
      criticality: 'medium',
      startsInHours: 8,
      shiftType: 'morning',
      startTime: '08:00',
      endTime: '15:00',
    },
  },
}

export const LowCriticality: Story = {
  args: {
    incident: {
      ...mockIncident,
      criticality: 'low',
      startsInHours: 24,
      shiftType: 'afternoon',
      startTime: '15:00',
      endTime: '22:00',
      currentStaff: 3,
      unitMinStaff: 3,
    },
  },
}

export const NoStaffingRisk: Story = {
  args: {
    incident: {
      ...mockIncident,
      currentStaff: 4,
      unitMinStaff: 4,
    },
  },
}
