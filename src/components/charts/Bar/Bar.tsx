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
  height: 12,
  borderRadius: '0 8px 8px 0',
  background: color || '#fff',
  width: `${percent}%`,
  transition: 'width 0.2s ease-in'
}))

const Bar = ({ label, percent = 0, value, change }: BarProps) => {
  return (
    <Stack className="ln-bar" sx={{ width: `100%` }}>
      <Typography variant="body1" whiteSpace="nowrap">
        {label}
      </Typography>
      <Stack direction="row" alignItems="center" gap={1}>
        <Track color={getValueChangeTextColor(change)} percent={percent} />
        <Stack direction="row" alignItems="flex-end" spacing={1}>
          <Typography>{value.toLocaleString()}</Typography>
          <Stack direction="row">
            {change !== 0 &&
              (change > 0 ? <NorthEastIcon color="success" /> : <SouthEastIcon color="error" />)}
            <Typography
              component="span"
              color={getValueChangeTextColor(change)}
              variant="h6"
              sx={{ ml: 1 }}
            >
              {change}%
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Bar
