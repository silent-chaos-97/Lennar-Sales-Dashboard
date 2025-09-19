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
