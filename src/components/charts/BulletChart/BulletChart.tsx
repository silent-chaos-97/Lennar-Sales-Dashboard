import { CSSProperties, useMemo } from 'react'
import Stack from '@mui/material/Stack'
import BulletBar from './BulletBar'
import { useAppState } from '@/contexts/StateContext'
import { PacingBulletBarColors } from '@/types/pacing'

interface BulletChartProps {
  height?: CSSProperties['height']
  width?: CSSProperties['width']
}

const BulletChart = ({ height = '100%', width = '100%' }: BulletChartProps) => {
  const { pacingState } = useAppState()

  const homes = {
    black: pacingState?.AVAILABLE_HOMES?.black_homes || 0,
