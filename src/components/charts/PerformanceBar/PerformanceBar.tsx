import CustomTooltip from '@/components/common/CustomTooltip'
import DataAlert from '@/components/common/CustomTooltip/DataAlert'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

interface TrackProps {
  color?: string
  percent: number
}

interface GoalLineProps {
  color?: string
  percent: number
  goal: number
}

const Track = styled('div', {
  shouldForwardProp: (prop) => !['color', 'percent'].includes(prop as string)
})(({ color, percent }: TrackProps) => ({
  width: 48,
  borderRadius: '4px 4px 0 0',
