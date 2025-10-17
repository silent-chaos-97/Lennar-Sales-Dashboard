import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

interface FrameData {
  date: string | undefined
  total: number | undefined
  f0: number | undefined
  f1: number | undefined
  f2: number | undefined
  f3: number | undefined
  [key: string]: number | string | undefined
}

interface DataEntry {
  weekday: string
  cur: FrameData
  prv: FrameData
}

interface StackedBarChartProps {
  data: DataEntry
  maxValue: number
}

interface StackedData {
  key: string
  cur?: string | number
  prv?: string | number
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({ data, maxValue }) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    drawChart()
    window.addEventListener('resize', drawChart)
    return () => {
      window.removeEventListener('resize', drawChart)
    }
  }, [data])

  const stackData = () => {
    const stackedData: StackedData[] = []
    const keys = Object.keys(data.cur)
    keys.forEach((key) => {
      if (key !== 'date' && key !== 'total') {
        const stackedEntry = {
          key: key,
          cur: data.cur[key],
          prv: data.prv[key]
        }
        stackedData.push(stackedEntry)
      }
    })
    return stackedData
  }

  const drawChart = () => {
    const containerWidth = (svgRef.current?.parentNode as HTMLElement).clientWidth
    const containerHeight = (svgRef.current?.parentNode as HTMLElement).clientHeight
    const width = containerWidth
    const height = containerHeight
