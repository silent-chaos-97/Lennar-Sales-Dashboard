import { useEffect } from 'react'
import * as d3 from 'd3'
import { PricingData } from '@/types/pacing'
import Box from '@mui/material/Box'

interface BoxPlotProps {
  id: string
  width: number
  height: number
  data: PricingData
}

const BoxPlot = ({ id, width: nWidth, height: nHeight, data }: BoxPlotProps) => {
  useEffect(() => {
    // Calculate the domain for the x and y scales
    const boxPlotData = Object.keys(data).map((key: string) => {
      return [
        data?.[key]?.percentile_5 || 0,
        data?.[key]?.percentile_25 || 0,
        data?.[key]?.percentile_50 || 0,
        data?.[key]?.percentile_75 || 0,
        data?.[key]?.percentile_95 || 0
      ]
    })

    const margin = { top: 10, right: 30, bottom: 50, left: 50 },
      width = nWidth - margin.left - margin.right,
      height = nHeight - margin.top - margin.bottom

    // append the svg object to the body of the page
    d3.select(`#${id} > *`).remove()
    const svg = d3
      .select(`#${id}`)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // Show the Y scale
    const y = d3
      .scaleLinear()
      .domain([0, Math.max(...boxPlotData.flat())])
      .range([height, 0])
    const yAxisGroup = svg.call(
      d3
        .axisLeft(y)
        .ticks(5)
        .tickSizeInner(-width)
        .tickSizeOuter(0)
        .tickPadding(12)
