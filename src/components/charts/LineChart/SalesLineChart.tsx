// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect } from 'react'
import * as d3 from 'd3'
import { SalesDetailObject } from '@/types/sales'

interface LineChartProps {
  id: string
  width?: number
  height?: number
  data: SalesDetailObject['graph']
}

const SalesLineChart = ({ id, width = 170, height = 80, data }: LineChartProps) => {
  useEffect(() => {
    d3.select(`#${id}`).selectAll('*').remove()
    if (data.length) {
      const xValues = data.map((item) => item.x_axis)
      const yValues = data.map((item) => item.y_axis)

      const margin = { top: 10, right: 24, bottom: 30, left: 24 },
        chartWidth = width - margin.left - margin.right,
        chartHeight = height - margin.top - margin.bottom

      const svg = d3
        .select(`#${id}`)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
      const xScale = d3.scalePoint().domain(xValues).range([0, chartWidth])

      const yScale = d3
        .scaleLinear()
        .domain([d3.min(yValues), d3.max(yValues)])
        .range([chartHeight, 0])

      const line = d3
        .line()
        .curve(d3.curveCardinal)
        .x((d) => xScale(d.x_axis))
        .y((d) => yScale(d.y_axis))
        .defined((d, i, data) => {
          if (i === data.length - 1 && d.y_axis === 0) return false
          return true
        })

      // After defining your xScale and yScale
      const xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(30)

      // Append the xAxis to your svg
      svg
        .append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .style('font-size', '12px')
        .call(xAxis)
        .call((g) => g.select('.domain').remove())
        .selectAll('.tick') // select all ticks
        .select('text') // select the text of each tick
        .style('fill', (d, i, nodes) => (i === nodes.length - 1 ? '#FFF' : '#70747A')) // change the color based on the condition

      // Define the gradient area
      svg
        .append('defs')
        .append('linearGradient')
        .attr('id', 'gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%')
        .selectAll('stop')
        .data([
          { offset: '0%', color: 'rgba(20,122,214,0.5)' },
          { offset: '100%', color: 'rgba(0,93,170,0)' }
        ])
        .enter()
        .append('stop')
        .attr('offset', function (d) {
          return d.offset
        })
        .attr('stop-color', function (d) {
          return d.color
        })

      // Draw area for current ticker
      const area = d3
        .area()
        .x((d) => xScale(d.x_axis))
        .y0(height)
        .y1((d) => yScale(d.y_axis))
        .curve(d3.curveCardinal)
        .defined((d, i, data) => {
          if (i === data.length - 1 && d.y_axis === 0) return false
          return true
        })

      svg.append('path').datum(data).attr('fill', 'url(#gradient)').attr('d', area)

      // Draw current ticker line
      svg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#33A3FF')
        .attr('stroke-width', 3)
        .attr('d', line)

      // Draw Circle dot at the end of current ticker
      const lastPoint =
