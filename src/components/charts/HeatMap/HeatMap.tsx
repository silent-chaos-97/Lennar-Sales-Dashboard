// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useMemo } from 'react'
import * as d3 from 'd3'

const MARGIN = { top: 0, right: 0, bottom: 0, left: 0 }

type HeatmapProps = {
  cWidth?: number
  size?: number
  spacing?: number
  nRow: number
