import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

interface FrameData {
  date: string | undefined
  total: number | undefined
  f0: number | undefined
  f1: number | undefined
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
