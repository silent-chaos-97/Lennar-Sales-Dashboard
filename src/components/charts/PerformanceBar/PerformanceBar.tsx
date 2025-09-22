import CustomTooltip from '@/components/common/CustomTooltip'
import DataAlert from '@/components/common/CustomTooltip/DataAlert'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface TrackProps {
  color?: string
  percent: number
}

interface GoalLineProps {
  color?: string
  percent: number
  goal: number
