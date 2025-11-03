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
        .tickFormat((d) => d3.format('.2s')(d).replace('G', 'k'))
    )
    yAxisGroup.select('.domain').remove()
    yAxisGroup.selectAll('.tick text').style('fill', '#70747A').style('font-size', '16px')
    // Style the grid lines
    yAxisGroup.selectAll('.tick line').attr('stroke', 'rgba(255,255,255,0.18)')

    const xScale = d3
      .scaleBand()
      .domain(boxPlotData.map((d, i) => ['LEN', 'New Contruction', 'Resale'][i]))
      .range([0, width])
      .paddingInner(0.4)
      .paddingOuter(0)

    const xAxisGroup = svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0).tickPadding(12).tickSizeInner(0))
    xAxisGroup.select('.domain').remove()
    xAxisGroup.selectAll('.tick text').style('fill', '#70747A').style('font-size', '16px')

    // Add x-axis labels
    svg
      .selectAll('.x-label')
      .data(boxPlotData)
      .enter()
      .append('text')
      .attr('class', 'x-label')
      .attr(
        'x',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (d, i) => xScale(['LEN', 'New Contruction', 'Resale'][i])! + xScale.bandwidth() / 2
      )
      .attr('y', height + 20)
      .attr('text-anchor', 'middle')
      .text((d, i) => ['LEN', 'New Contruction', 'Resale'][i])

    const boxWidth = 44

    function showTooltip(d: d3.NumberValue, boxCenter: number, idx: number) {
      const xPos = boxCenter - boxWidth / 2 - 80 // Adjust position as needed
      const yPos = y(d) - 21
      const label = boxPlotData[0][2] - Number(d) > 0 ? 'Lower' : 'Higher'

      // Show tooltip and position it
      d3.select(`#${id}-tooltip-${idx}`)
        .style('display', 'block')
        .style('left', xPos + 'px')
        .style('top', yPos + 'px')
        .text(`$${Math.abs(boxPlotData[0][2] - Number(d)).toLocaleString()}\n`)
        .append('tspan')
        .style('color', '#b4b8bc')
        .text(label)
    }

    boxPlotData.forEach((botPlot, idx) => {
      const q1 = botPlot[1]
      const median = botPlot[2]
      const q3 = botPlot[3]
      // const interQuantileRange = q3 - q1
      // const min = q1 - 1.5 * interQuantileRange
      // const max = q1 + 1.5 * interQuantileRange
      const min = botPlot[0]
      const max = botPlot[4]

      const boxCenter = idx * ((width - 200) / (boxPlotData.length - 1)) + 100

      // Show the main vertical line
      svg
        .append('line')
        .attr('x1', boxCenter)
        .attr('x2', boxCenter)
        .attr('y1', y(min))
        .attr('y2', y(max))
        .attr('stroke', idx === 0 ? '#33A3FF' : 'rgba(242,242,242,0.33)')
        .attr('stroke-width', 2)
        .attr('opacity', idx === 0 ? 0.75 : 1)

      // Show the box
      svg
