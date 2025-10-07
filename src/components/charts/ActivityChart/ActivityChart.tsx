import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import HeatMap from '../HeatMap'
import { TickerItem } from '@/types/current_activity'
import { useResizeDetector } from 'react-resize-detector'
import { DateTime } from 'luxon'
import { useAppState } from '@/contexts/StateContext'
import { TIMEZONE, TIMEZONE_VALUE } from '@/utils/constant'
import { useMemo } from 'react'

interface ActivityChartProps {
  data: TickerItem[]
}

const ActivityChart = ({ data }: ActivityChartProps) => {
  const { width, ref } = useResizeDetector()
  const { currentCohort } = useAppState()

  // Get the current date and time in the local time zone
  const now = DateTime.local().setZone(TIMEZONE[currentCohort.timezone])
