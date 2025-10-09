import { Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import NorthEastIcon from '@mui/icons-material/NorthEast'
import SouthEastIcon from '@mui/icons-material/SouthEast'
import { getValueChangeTextColor } from '@/utils/helper'

  label: string
  percent?: number
  value: number
  color?: string
  change: number
}

interface TrackProps {
  color?: string
  percent: number
