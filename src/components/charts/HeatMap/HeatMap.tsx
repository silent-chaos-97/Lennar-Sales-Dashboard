// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useMemo } from 'react'
import * as d3 from 'd3'
import { TickerItem } from '@/types/current_activity'

const MARGIN = { top: 0, right: 0, bottom: 0, left: 0 }

type HeatmapProps = {
  cWidth?: number
  size?: number
  spacing?: number
  nRow: number
  nCol: number
  data: TickerItem[]
  ref?: OneRefChangeTime
}

const HeatMap = ({ size = 4, cWidth, nRow, nCol, spacing = 1, data }: HeatmapProps) => {
  const width = cWidth || (size + spacing) * nCol - spacing
  const height = 87 || (size + spacing) * nRow - 1 // 87 is the height of the ActivityChart
  // bounds = area inside the axis
  const boundsWidth = width - MARGIN.right - MARGIN.left
  const boundsHeight = height - MARGIN.top - MARGIN.bottom

  const parseTime = d3.timeParse('%Y-%m-%d %H:%M:%S.%L')

  const allYGroups = useMemo(() => {
    const tempY2 = Array.from({ length: nRow / 2 }, (_, i) => i + 1)
    const tempY = Array.from({ length: nRow }, (_, i) => i + 1)
    const allYGroups = Array.from(new Set(data.map((d) => d.sort)))

    if (allYGroups.length <= 9) {
      return tempY2
    } else if (allYGroups.length > 9 && allYGroups.length < 18) {
      return tempY
    } else {
      return allYGroups
    }
  }, [data, nRow])

  // x and y scales

  const today = data[0]?.activity_time ? parseTime(data[0].activity_time) : new Date()
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7, 0, 0) // Set the start time to 9am
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19, 0, 0) // Set the end time to 9pm

  const xScale = useMemo(() => {
    return d3
      .scaleTime()
      .range([0, boundsWidth])
      .domain([startOfDay, endOfDay])
      .nice(d3.timeMinute.every(5))
      .clamp(true)
  }, [data, width])

  useMemo(() => {
    return d3.axisBottom(xScale).ticks(d3.timeMinute.every(5)).tickFormat(d3.timeFormat('%H:%M'))
  }, [xScale])

  const yScale = useMemo(() => {
  }, [boundsHeight, allYGroups])

  const dotColors = {
    Active: '#33A3FF',
    Missed: '#DF4747',
    Connected: 'rgba(255,255,255,0.33)'
  }

  const allRects = useMemo(
    () =>
      data.map((d, i) => {
        const isScaled = allYGroups.length <= 9
        return (
          <rect
            key={i}
            r={size}
            x={xScale(parseTime(d.activity_time))}
            y={yScale(d.sort)}
            width={size}
            height={size * (isScaled ? 2 : 1)}
            opacity={1}
            rx={size}
            fill={dotColors[d.activity_status]}
          />
        )
      }),
