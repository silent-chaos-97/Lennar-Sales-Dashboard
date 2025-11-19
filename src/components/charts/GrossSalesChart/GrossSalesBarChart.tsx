// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect } from 'react'
import * as d3 from 'd3'
import { DateTime } from 'luxon'
import { Typography } from '@mui/material'

interface GrossSalesBarChartProps {
  id: string
  width: number
  height: number
}

const MARGIN = { top: 10, right: 0, bottom: 40, left: 20 }

const GrossSalesBarChart = ({ width, height, data, id }: GrossSalesBarChartProps) => {
  const now = DateTime.now()
  const currentMonday = now.startOf('week').startOf('day').toFormat('MMM dd')

  useEffect(() => {
    const x = d3.scaleBand().range([0, width]).padding(0.5)
    const y = d3.scaleLinear().range([height, 0])
    d3.select(`#${id} > *`).remove()
    const svg = d3
      .select(`#${id}`)
      .attr('width', width + MARGIN.left + MARGIN.right)
      .attr('height', height + MARGIN.top + MARGIN.bottom)
      .append('g')
      .attr('transform', 'translate(' + MARGIN.left + ',' + MARGIN.top + ')')

    if (data.length) {
      x.domain(data.map((d) => d.x_axis))
      y.domain([0, d3.max(data, (d) => d.y_axis)]).range([height, 0])

      const borderRadius = 8
      svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'bar')
        .attr('fill', '#1ABB96')
        .attr('d', (d) => {
          const xVal = x(d.x_axis)
          const yVal = y(d.y_axis)
          const barWidth = x.bandwidth()
          const barHeight = height - y(d.y_axis)
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

      const xAxis = d3
        .axisBottom(x)
        .tickFormat((d) => {
          return d
        })
        .tickSize(0)
        .tickPadding(12)

      const xAxisGroup = svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
      xAxisGroup.select('.domain').style('stroke', 'rgba(255,255,255,0.18)')
      xAxisGroup.selectAll('.tick text').attr('transform', 'translate(0, 5)')
      xAxisGroup.selectAll('.tick text').style('font-size', '12px')
      xAxisGroup
        .selectAll('.tick text')
        .style('fill', (d) => (d === currentMonday ? '#fff' : '#70747A'))

      const yAxis = d3
        .axisLeft(y)
        .ticks(d3.max(data, (d) => d.y_axis))
        .tickSizeInner(-width)
        .tickSizeOuter(0)
        .tickPadding(12)
      const yAxisGroup = svg.append('g').call(yAxis)
