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
