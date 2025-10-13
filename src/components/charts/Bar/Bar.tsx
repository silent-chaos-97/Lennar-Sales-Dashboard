import { Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import NorthEastIcon from '@mui/icons-material/NorthEast'
import SouthEastIcon from '@mui/icons-material/SouthEast'
import { getValueChangeTextColor } from '@/utils/helper'

interface BarProps {
  label: string
  percent?: number
  value: number
  color?: string
  change: number
}

interface TrackProps {
  color?: string
  percent: number
}

const Track = styled('span', {
  shouldForwardProp: (prop) => !['color', 'percent'].includes(prop as string)
})(({ color, percent }: TrackProps) => ({
