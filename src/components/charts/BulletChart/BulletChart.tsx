import { CSSProperties, useMemo } from 'react'
import Stack from '@mui/material/Stack'
import BulletBar from './BulletBar'
import { useAppState } from '@/contexts/StateContext'

interface BulletChartProps {
  height?: CSSProperties['height']
  width?: CSSProperties['width']
}

const BulletChart = ({ height = '100%', width = '100%' }: BulletChartProps) => {
  const { pacingState } = useAppState()

  const homes = {
