export const colors = {
  brand: {
    teal: '#0E3A3A',
    tealHover: '#11504A',
    mint: '#2DD4A7',
    mintSoft: '#E6F7F1',
  },
  success: {
    text: '#0F6E56',
    bg: '#E1F5EE',
    border: '#1D9E75',
  },
  warning: {
    text: '#854F0B',
    bg: '#FAEEDA',
    border: '#EF9F27',
  },
  danger: {
    text: '#A32D2D',
    bg: '#FCEBEB',
    border: '#E24B4A',
  },
  // info = agent identity — teal family, NOT blue
  info: {
    text: '#0F6E56',
    bg: '#E6F7F1',
    border: '#2DD4A7',
  },
  shift: {
    morning: '#F5A623',
    afternoon: '#EC4899',
    night: '#14B8A6',
  },
  neutral: {
    textPrimary: '#1A1A1A',
    textSecondary: '#5F5E5A',
    textTertiary: '#8E8D88',
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F4F6F6',
    border: '#E3E6E6',
  },
} as const

export type Colors = typeof colors
