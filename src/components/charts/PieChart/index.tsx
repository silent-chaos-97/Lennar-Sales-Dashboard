// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect } from 'react'
import * as d3 from 'd3'
import { STATUS_COLORS, STATUS_TEXT_BY_KEY } from '@/utils/constant'

interface PieChartProps {
  width?: number
  height?: number
  data: Record<string, number>
  activeName: string
  onClickSlice: (value: Array<string | number>) => void
}

const PieChart = ({ width = 360, height = 250, data, activeName, onClickSlice }: PieChartProps) => {
  useEffect(() => {
    d3.select('#pie_chart > *').remove()
    const radius = Math.min(width, height) / 2

    const svg = d3
      .select('#pie_chart')
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + (height / 2 + 10) + ')')

    const color = d3
      .scaleOrdinal()
      .domain(['very_ahead_of_pace', 'ahead_of_pace', 'on_pace', 'behind_pace', 'very_behind_pace'])
      .range(Object.values(STATUS_COLORS))

    const pie = d3
      .pie()
      .value(function (d) {
        return d[1]
      })
      .startAngle(0)
      .endAngle(2 * Math.PI)
      .sort(null)
    const data_ready = pie(Object.entries(data).sort((a, b) => b[1] - a[1]))

    // The arc generator
    let radiusFactor = 1
    const arc = d3
      .arc()
      .innerRadius(0) // This is the size of the donut hole
