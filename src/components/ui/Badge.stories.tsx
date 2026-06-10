import type { Meta, StoryObj } from '@storybook/react'
import Badge from './Badge'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    tone:     { control: 'select', options: ['neutral', 'success', 'warning', 'danger', 'mint'] },
    size:     { control: 'select', options: ['sm', 'md'] },
    outlined: { control: 'boolean' },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story   = { args: { children: 'Neutro',    tone: 'neutral' } }
export const Success: Story   = { args: { children: 'Estable',   tone: 'success' } }
export const Warning: Story   = { args: { children: 'Frágil',    tone: 'warning' } }
export const Danger: Story    = { args: { children: 'Crítica',   tone: 'danger'  } }
export const Mint: Story      = { args: { children: 'Agente IA', tone: 'mint'    } }

export const OutlinedNeutral: Story = { args: { children: 'Neutro',    tone: 'neutral', outlined: true } }
export const OutlinedSuccess: Story = { args: { children: 'Estable',   tone: 'success', outlined: true } }
export const OutlinedWarning: Story = { args: { children: 'Frágil',    tone: 'warning', outlined: true } }
export const OutlinedDanger: Story  = { args: { children: 'Crítica',   tone: 'danger',  outlined: true } }
export const OutlinedMint: Story    = { args: { children: 'Agente IA', tone: 'mint',    outlined: true } }

export const SizeMd: Story = { args: { children: 'Criticidad alta', tone: 'danger', size: 'md' } }
