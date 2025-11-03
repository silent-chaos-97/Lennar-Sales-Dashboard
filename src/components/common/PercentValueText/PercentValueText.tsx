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
  return (
    <Stack direction="row" alignItems="flex-end" spacing={1}>
      <Typography variant="h1" sx={{ fontWeight: { fontWeight } }}>
        {prefix} {value.toLocaleString()} {suffix}
      {!hideChange && (
        <Stack sx={{ pb: 0.75 }}>
          {change !== 0 &&
            (change > 0 ? <NorthEastIcon color="success" /> : <SouthEastIcon color="error" />)}
