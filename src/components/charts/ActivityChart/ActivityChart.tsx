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

  // Set the time to 7am today
  const startOfDay = now.startOf('day').set({ hour: 7 })

  // Set the time to 7pm today
  const endOfDay = now.startOf('day').set({ hour: 19 })

  const filteredData = useMemo(
    () =>
      data.filter((event) => {
        const activityTime = DateTime.fromFormat(event.activity_time, 'yyyy-MM-dd HH:mm:ss.SSS')
        const activityTimeInMinutes = activityTime.hour * 60 + activityTime.minute

