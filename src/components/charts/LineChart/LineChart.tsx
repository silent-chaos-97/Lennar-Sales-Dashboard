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
      const hours = data.map((item) => item.hour)
      const currentHourIndex = showCurrentFully
        ? hours.length - 1
        : hours.findIndex((hour) => hour === currentHour)
      const filteredCurrentTickers = currentTickers
        .slice(0, currentHourIndex + 1)
        .filter((ticker) => ticker !== '')
      const margin = { top: 10, right: 0, bottom: 10, left: 0 },
        chartWidth = width - margin.left - margin.right,
        chartHeight = height - margin.top - margin.bottom

      const svg = d3.select(`#${id}`)
      const xScale = d3
        .scaleLinear()
        .domain([0, currentTickers.length - 1])
        .range([0, chartWidth])
