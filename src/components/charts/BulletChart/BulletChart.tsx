import { CSSProperties, useMemo } from 'react'
import Stack from '@mui/material/Stack'
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
    red: pacingState?.AVAILABLE_HOMES?.red_homes || 0,
    yellow: pacingState?.AVAILABLE_HOMES?.yellow_homes || 0,
    green: pacingState?.AVAILABLE_HOMES?.green_homes || 0
  }

  const maxLimit = useMemo(() => {
    return Math.max(...Object.values(homes))
  }, [homes])

  return (
    <Stack
      height={height}
      width={width}
      direction="row"
      sx={{
        borderBottom: '1px solid rgba(255,255,255,0.18)',
