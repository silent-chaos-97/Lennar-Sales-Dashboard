import { useEffect } from 'react'
import * as d3 from 'd3'
import { PricingData } from '@/types/pacing'
import Box from '@mui/material/Box'

interface BoxPlotProps {
  id: string
  width: number
  height: number
  data: PricingData
}

const BoxPlot = ({ id, width: nWidth, height: nHeight, data }: BoxPlotProps) => {
  useEffect(() => {
    // Calculate the domain for the x and y scales
    const boxPlotData = Object.keys(data).map((key: string) => {
      return [
        data?.[key]?.percentile_5 || 0,
        data?.[key]?.percentile_25 || 0,
        data?.[key]?.percentile_50 || 0,
        data?.[key]?.percentile_75 || 0,
        data?.[key]?.percentile_95 || 0
      ]
    })
