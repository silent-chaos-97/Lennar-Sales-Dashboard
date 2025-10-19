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

      // Append the xAxis to your svg
      svg
        .append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .style('font-size', '12px')
        .call(xAxis)
        .call((g) => g.select('.domain').remove())
        .selectAll('.tick') // select all ticks
        .select('text') // select the text of each tick
