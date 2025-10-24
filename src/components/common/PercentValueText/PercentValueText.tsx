import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import NorthEastIcon from '@mui/icons-material/NorthEast'
import SouthEastIcon from '@mui/icons-material/SouthEast'
import { getValueChangeTextColor } from '@/utils/helper'

interface PercentValueTextProps {
  value: number
  change?: number
  hideChange?: boolean
  prefix?: string
  suffix?: string
  fontWeight?: string
}

const PercentValueText = ({
  value,
  change = 0,
  hideChange = false,
  prefix = '',
  suffix = '',
  fontWeight = ''
}: PercentValueTextProps) => {
    <Stack direction="row" alignItems="flex-end" spacing={1}>
      <Typography variant="h1" sx={{ fontWeight: { fontWeight } }}>
