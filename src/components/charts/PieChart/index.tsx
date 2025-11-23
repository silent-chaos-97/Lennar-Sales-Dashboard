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
      .outerRadius(function (d) {
        if (d.value) {
          radiusFactor -= 0.05
        }
        return radius * 0.7 * radiusFactor
      })

    // Another arc that won't be drawn. Just for labels positioning
    // let outerRadiusFactor = 1
    const outerArc = d3
      .arc()
      .innerRadius(radius * 0.4)
      .outerRadius(radius * 0.6)

    svg
      .selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function (d) {
        return color(d.data[0])
      })
      .attr('stroke-width', '2px')
      .attr('stroke', function (d) {
        return d.data[0] === activeName ? 'white' : 'none'
      })
      .style('opacity', 0.8)
      .on('click', function (event, d) {
        onClickSlice(d.data)
      })

    // Add the polylines between chart and labels:
    let yThreshold = 0
    svg
      .selectAll('allPolylines')
      .data(data_ready)
      .enter()
      .append('polyline')
      .attr('stroke', 'rgba(255,255,255,0.5)')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      .attr('points', function (d) {
        if (d.value) {
          const posA = arc.centroid(d) // line insertion in the slice
          const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
          const posC = outerArc.centroid(d) // Label position = almost the same as posB
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
          posB[1] =
            posB[1] - yThreshold * (midangle < Math.PI / 2 && midangle > (Math.PI * 3) / 2 ? 1 : -1)
          posC[1] =
            posC[1] - yThreshold * (midangle < Math.PI / 2 && midangle > (Math.PI * 3) / 2 ? 1 : -1)
          posC[0] = radius * 0.7 * (midangle < Math.PI ? 1 : -1) // multiply by 1 or -1 to put it on the right or on the left
          if (d.value) {
            yThreshold -= 12
          }
          return [posA, posB, posC]
        }

        return []
      })

    // Add the polylines between chart and labels:
    let textYThreshold = 0
    svg
      .selectAll('allLabels')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function (d) {
        return d.data[1] ? `${d.value} ${STATUS_TEXT_BY_KEY[d.data[0]]}` : null
      })
      .attr('transform', function (d) {
        const pos = outerArc.centroid(d)
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
