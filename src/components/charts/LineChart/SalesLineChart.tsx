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
