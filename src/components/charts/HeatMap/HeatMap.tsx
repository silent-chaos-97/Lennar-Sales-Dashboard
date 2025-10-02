// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useMemo } from 'react'
import * as d3 from 'd3'
import { TickerItem } from '@/types/current_activity'

const MARGIN = { top: 0, right: 0, bottom: 0, left: 0 }

type HeatmapProps = {
  cWidth?: number
  size?: number
  spacing?: number
  nRow: number
  nCol: number
  data: TickerItem[]
  ref?: OneRefChangeTime
}

const HeatMap = ({ size = 4, cWidth, nRow, nCol, spacing = 1, data }: HeatmapProps) => {
  const width = cWidth || (size + spacing) * nCol - spacing
  const height = 87 || (size + spacing) * nRow - 1 // 87 is the height of the ActivityChart
  // bounds = area inside the axis
  const boundsWidth = width - MARGIN.right - MARGIN.left
  const boundsHeight = height - MARGIN.top - MARGIN.bottom

