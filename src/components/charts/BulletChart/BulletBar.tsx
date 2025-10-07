import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CustomTooltip from '@/components/common/CustomTooltip'
import { PacingBulletBarColors } from '@/types/pacing'

interface BulletBarProps {
  id: string
  value: number
  label?: string
  maxValue?: number
  color?: PacingBulletBarColors
}

const BulletBar = ({
  id,
  value,
  label,
  maxValue = 100,
  color = PacingBulletBarColors.white
}: BulletBarProps) => {
  return (
