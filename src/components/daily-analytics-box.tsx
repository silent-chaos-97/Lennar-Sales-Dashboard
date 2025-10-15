import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import SouthEastIcon from '@mui/icons-material/SouthEast'
import NorthEastIcon from '@mui/icons-material/NorthEast'
import { useMemo } from 'react'
import { SalesDetailObject } from '@/types/sales'
import CustomTooltip from './common/CustomTooltip'
import DataAlert from './common/CustomTooltip/DataAlert'
import SalesLineChart from './charts/LineChart/SalesLineChart'

export interface DailyAnalyticsBoxProps {
  isLargeSize?: boolean
  title: string
  value: number
  grossValue: number
  diffPercent: number
  color?: string
  unit?: string
  isDecreaseBenefit?: boolean
  graphData?: SalesDetailObject['graph']
}

const DailyAnalyticsBox = ({
  isLargeSize = false,
  title,
  value,
  grossValue,
  diffPercent,
  unit = '',
  graphData,
  isDecreaseBenefit = false
}: DailyAnalyticsBoxProps) => {
  const emStyle = {
    fontSize: 104,
    lineHeight: '114px'
  }

  const diffColor = useMemo(() => {
    if (diffPercent === 0) return 'text.primary'
    else if (diffPercent > 0) return isDecreaseBenefit ? 'error' : 'success.main'
    return isDecreaseBenefit ? 'success.main' : 'error'
  }, [diffPercent, isDecreaseBenefit])

  const displayValue = useMemo(() => {
    if (value !== 0) {
      if (unit !== '%') {
