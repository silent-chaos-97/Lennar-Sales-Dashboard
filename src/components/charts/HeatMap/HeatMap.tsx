// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { useMemo } from 'react'
import * as d3 from 'd3'
import { TickerItem } from '@/types/current_activity'

const MARGIN = { top: 0, right: 0, bottom: 0, left: 0 }

type HeatmapProps = {
