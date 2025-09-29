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

    // set the color scale
    const color = d3
      .scaleOrdinal()
