import { useCallback, useMemo } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DateTime } from 'luxon'
import StackedBarChart from './StackedBarChart'
import CustomTooltip from '@/components/common/CustomTooltip'
import { TickerItem } from '@/types/current_activity'

interface AppointmentSetProps {
  currentWeekData: TickerItem[]
  prevWeekData: TickerItem[]
  activityTimeframe: string
}

interface DayType {
  weekday: string | null
  date: string
  total: number
  byFrame: number[]
}

const AppointmentSet = ({
  currentWeekData,
  prevWeekData,
  activityTimeframe
}: AppointmentSetProps) => {
  const aggregateWeekData = useCallback(
    (data: TickerItem[], isPrevWeek = false): DayType[] => {
      const nWeekdayEvents: Record<string, { total: number; byTimeframe: number[] }> = {}
      data.forEach((event) => {
        if (event.activity_time) {
          const eventDateTime = DateTime.fromISO(event.activity_time.replace(' ', 'T') + 'Z')
          const weekdate = eventDateTime.toFormat('yyyy-MM-dd')
          const weekday = eventDateTime.weekdayShort
          const hour = eventDateTime.hour
