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
