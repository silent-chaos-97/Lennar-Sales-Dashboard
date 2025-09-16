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
