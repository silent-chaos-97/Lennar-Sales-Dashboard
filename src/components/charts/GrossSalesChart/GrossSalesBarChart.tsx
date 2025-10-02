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
  data: []
}

const MARGIN = { top: 10, right: 0, bottom: 40, left: 20 }

const GrossSalesBarChart = ({ width, height, data, id }: GrossSalesBarChartProps) => {
  const now = DateTime.now()
  const currentMonday = now.startOf('week').startOf('day').toFormat('MMM dd')

  useEffect(() => {
    const x = d3.scaleBand().range([0, width]).padding(0.5)
    const y = d3.scaleLinear().range([height, 0])
