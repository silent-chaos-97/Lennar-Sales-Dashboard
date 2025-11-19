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

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    if (!data) {
      return
    }

    const stackedData = stackData()
    const xScale = d3.scaleLinear().domain([0, maxValue]).range([height, 0]).nice()
    const color = d3.scaleOrdinal().domain(['cur', 'prv']).range(['#33A3FF', '#000000'])

    const curData = stackedData.map((entry) => ({
      key: entry.key,
      value: entry.cur
    }))

    const prvData = stackedData.map((entry) => ({
      key: entry.key,
      value: entry.prv
    }))

    const yScaleCur = d3
      .scaleBand()
      .domain(curData.map((entry) => entry.key))
      .rangeRound([0, width])
      .padding(0.1)

    const yScalePrv = d3
      .scaleBand()
      .domain(prvData.map((entry) => entry.key))
      .rangeRound([0, width])
      .padding(0.1)

    svg
      .append('g')
      .attr('transform', `translate(0, 0)`)
      .selectAll('g')
      .data(prvData)
      .enter()
      .append('rect')
      .attr('width', width / 5)
      .attr('x', (d) => yScalePrv(d.key.toString()) || 0)
      .attr('y', (d) => xScale(Number(d.value)))
      .attr('height', (d) => xScale(0) - xScale(Number(d.value)))
      .attr('rx', 5)
      .attr('fill', color('prv') as string)

    svg
      .append('g')
      .attr('transform', `translate(0, 0)`)
      .selectAll('g')
