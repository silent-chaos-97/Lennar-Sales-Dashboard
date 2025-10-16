import { useMemo } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import SouthEastIcon from '@mui/icons-material/SouthEast'
import NorthEastIcon from '@mui/icons-material/NorthEast'
import { DailyAnalyticsBoxProps } from './daily-analytics-box'

type CustomDailyAnalyticsBoxProps = Omit<
  DailyAnalyticsBoxProps,
  'graphData' | 'isLargeSize' | 'color' | 'grossValue'
>

const CustomDailyAnalyticsBox = ({
  title,
  value,
  diffPercent,
  unit = '',
  isDecreaseBenefit = false
