import type { Meta, StoryObj } from '@storybook/react'
import PersonAvatar from './PersonAvatar'

const meta = {
  title: 'Domain/PersonAvatar',
  component: PersonAvatar,
  tags: ['autodocs'],
  argTypes: {
    badge: { control: 'select', options: ['none', 'in', 'out'] },
    size:  { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof PersonAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { initials: 'CR' },
}

export const WithName: Story = {
  args: { initials: 'CR', name: 'Carmen Ruiz', subtitle: 'Enfermera UCI · Era la reserva' },
}

export const BadgeIn: Story = {
  args: { initials: 'CR', name: 'Carmen Ruiz', subtitle: 'Asignada al turno', badge: 'in' },
}

export const BadgeOut: Story = {
  args: { initials: 'LG', name: 'Laura García', subtitle: 'Baja médica · UCI Noche', badge: 'out' },
}

export const SizeSm: Story = {
  args: { initials: 'CR', name: 'Carmen Ruiz', badge: 'in', size: 'sm' },
}

export const SizeLg: Story = {
  args: { initials: 'CR', name: 'Carmen Ruiz', subtitle: 'Enfermera UCI', badge: 'in', size: 'lg' },
}

export const GroupPair: Story = {
  args: {
    badge: 'in',
    people: [{ initials: 'ML' }, { initials: 'SM' }],
    name: 'María L. + Sergio M.',
    subtitle: 'Turno dividido',
  },
}

export const GroupPairLarge: Story = {
  args: {
    badge: 'in',
    size: 'lg',
    people: [{ initials: 'ML' }, { initials: 'SM' }],
  },
}
