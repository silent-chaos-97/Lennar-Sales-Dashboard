// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect } from 'react'
import * as d3 from 'd3'
import { DateTime } from 'luxon'
import { Ticker } from '@/types/current_activity'
import { useAppState } from '@/contexts/StateContext'
import { TIMEZONE } from '@/utils/constant'

interface LineChartProps {
  id: string
  width?: number
  height?: number
  data: Ticker[]
  showCurrentFully: boolean
}

const LineChart = ({ id, width = 170, height = 80, data, showCurrentFully }: LineChartProps) => {
  const { currentCohort } = useAppState()
  useEffect(() => {
    d3.select(`#${id}`).selectAll('*').remove()
    if (data.length) {
      const now = DateTime.local().setZone(TIMEZONE[currentCohort.timezone])
      const currentHour = now.hour
      const currentTickers = data.map((item) => item.current)
