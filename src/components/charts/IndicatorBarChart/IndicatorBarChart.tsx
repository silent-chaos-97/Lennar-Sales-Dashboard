// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect } from 'react'
import * as d3 from 'd3'
import { WeeklyPacingItem } from '@/types/pacing'
import { DateTime } from 'luxon'

const MARGIN = { top: 0, right: 0, bottom: 26, left: 40 }

interface IndicatorBarChartProps {
  width: number
  height: number
  data: WeeklyPacingItem[]
  id: string
  currentWeekPrediction: number
  hidePredictionBar?: boolean
}

const IndicatorBarChart = ({
  width,
  height,
  data,
  id,
  currentWeekPrediction,
  hidePredictionBar = false
}: IndicatorBarChartProps) => {
  useEffect(() => {
    // Set ranges
    const now = DateTime.now()
    const currentMonday = now.startOf('week').startOf('day').toFormat('MMM dd')
    const x = d3.scaleBand().range([0, width]).padding(0.1)
    const y = d3.scaleLinear().range([height, 0])
    d3.select(`#${id} > *`).remove()
    const svg = d3
      .select(`#${id}`)
      .attr('width', width + MARGIN.left + MARGIN.right)
      .attr('height', height + MARGIN.top + MARGIN.bottom)
      .append('g')
      .attr('transform', 'translate(' + MARGIN.left + ',' + MARGIN.top + ')')

    if (data.length) {
      // Scale the range of the data in the domains
      x.domain(
        data.map((d) => {
          return d.x_axis
        })
      )
      y.domain([
        0,
        d3.max(data, (d: WeeklyPacingItem) => {
          return Math.max(d.gross_sales, d.future_pace, currentWeekPrediction, 1)
        })
      ])

      // Append rectangles for bar chart
      const borderRadius = 8
      svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'bar')
        .attr('fill', '#1ABB96')
        .attr('d', function (d) {
          const xVal = x(d.x_axis)
          const yVal = y(d.gross_sales)
          const barWidth = x.bandwidth()
          const barHeight = height - y(d.gross_sales)
          return barHeight > 0
            ? `M ${xVal},${yVal + borderRadius}
                L ${xVal},${yVal + barHeight}
                L ${xVal + barWidth},${yVal + barHeight}
                L ${xVal + barWidth},${yVal + borderRadius}
                Q ${xVal + barWidth},${yVal} ${xVal + barWidth - borderRadius},${yVal}
                L ${xVal + borderRadius},${yVal}
                Q ${xVal},${yVal} ${xVal},${yVal + borderRadius}
                Z`
            : ''
        })
      svg
        .selectAll('.bar-overlay')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'bar-overlay')
        .attr('fill', '#028090')
        .attr('style', 'opacity: 0.5;')
        .attr('d', function (d) {
          const xVal = x(d.x_axis)
          const yVal = y(d.future_pace)
          const barWidth = x.bandwidth()
          const barHeight = height - y(d.future_pace)
          return barHeight > 0
            ? `M ${xVal},${yVal + borderRadius}
                L ${xVal},${yVal + barHeight}
                L ${xVal + barWidth},${yVal + barHeight}
                L ${xVal + barWidth},${yVal + borderRadius}
                Q ${xVal + barWidth},${yVal} ${xVal + barWidth - borderRadius},${yVal}
                L ${xVal + borderRadius},${yVal}
                Q ${xVal},${yVal} ${xVal},${yVal + borderRadius}
                Z`
            : ''
        })
      // Add x axis
      const xAxis = d3
        .axisBottom(x)
        .tickFormat((d) => {
          const [month, day] = d.split(' ')
          return `${month} ${parseInt(day, 10)}`
        })
        .tickSize(0)
        .tickPadding(12)
      const xAxisGroup = svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
      xAxisGroup.select('.domain').style('stroke', 'rgba(255,255,255,0.18)')
      xAxisGroup
        .selectAll('.tick text')
        .style('fill', function (d) {
          return d === currentMonday ? '#fff' : '#70747A'
        })
        .style('font-size', '16px')

      // Add y axis
      const yAxis = d3.axisLeft(y).ticks(5).tickSizeInner(-width).tickSizeOuter(0).tickPadding(12)
      const yAxisGroup = svg.append('g').call(yAxis)
      yAxisGroup.select('.domain').remove()
      yAxisGroup.selectAll('.tick text').style('fill', '#70747A').style('font-size', '16px')
      yAxisGroup.selectAll('.tick line').attr('stroke', 'rgba(255,255,255,0.18)')

