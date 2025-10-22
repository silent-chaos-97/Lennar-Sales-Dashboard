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
          if (weekday) {
            if (!nWeekdayEvents[weekdate]?.total) {
              nWeekdayEvents[weekdate] = {
                total: 1,
                byTimeframe: [0, 0, 0, 0]
              }

              if (hour >= 0 && hour < 9) {
                nWeekdayEvents[weekdate].byTimeframe[0] =
                  nWeekdayEvents[weekdate].byTimeframe[0] + 1
              } else if (hour >= 9 && hour < 12) {
                nWeekdayEvents[weekdate].byTimeframe[1] =
                  nWeekdayEvents[weekdate].byTimeframe[1] + 1
              } else if (hour >= 12 && hour < 15) {
                nWeekdayEvents[weekdate].byTimeframe[2] =
                  nWeekdayEvents[weekdate].byTimeframe[2] + 1
              } else {
                nWeekdayEvents[weekdate].byTimeframe[3] =
                  nWeekdayEvents[weekdate].byTimeframe[3] + 1
              }
            } else {
              nWeekdayEvents[weekdate].total = (nWeekdayEvents[weekdate]?.total || 0) + 1
              if (hour >= 0 && hour < 9) {
                nWeekdayEvents[weekdate].byTimeframe[0] =
                  nWeekdayEvents[weekdate].byTimeframe[0] + 1
              } else if (hour >= 9 && hour < 12) {
                nWeekdayEvents[weekdate].byTimeframe[1] =
                  nWeekdayEvents[weekdate].byTimeframe[1] + 1
              } else if (hour >= 12 && hour < 15) {
                nWeekdayEvents[weekdate].byTimeframe[2] =
                  nWeekdayEvents[weekdate].byTimeframe[2] + 1
              } else {
                nWeekdayEvents[weekdate].byTimeframe[3] =
                  nWeekdayEvents[weekdate].byTimeframe[3] + 1
              }
            }
          }
        }
      })

      let currentDay = DateTime.now()
      if (activityTimeframe === 'yesterday') {
        currentDay = currentDay.minus({ days: 1 })
      } else if (activityTimeframe === 'prev_week') {
        currentDay = currentDay.minus({ days: 7 })
      }

      let monday = currentDay.startOf('week')
      if (isPrevWeek) monday = monday.minus({ days: 7 })
      const weekdays: { weekday: string | null; date: string; total: number; byFrame: number[] }[] =
        []
      for (let i = 0; i <= 6; i++) {
        const nextWeekday = monday.plus({ days: i }).weekdayShort
        const nextWeekdayDate = monday.plus({ days: i }).toFormat('yyyy-MM-dd')
        weekdays.push({
          weekday: nextWeekday,
          date: nextWeekdayDate,
          total: nWeekdayEvents[nextWeekdayDate]?.total || 0,
          byFrame: nWeekdayEvents[nextWeekdayDate]?.byTimeframe || [0, 0, 0, 0]
        })
