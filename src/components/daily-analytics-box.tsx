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
        return `${unit}${value.toLocaleString()}`
      } else {
        return `${value}${unit}`
      }
    } else {
      if (title === 'Gross sales' || grossValue !== 0) {
        return 0
      } else {
        return ''
      }
    }
  }, [value, unit, title, grossValue])

  const displayArrows = useMemo(() => {
    if (value !== 0 && diffPercent !== 0) {
      if (diffPercent > 0) {
        return <NorthEastIcon color={isDecreaseBenefit ? 'error' : 'success'} />
      } else {
        return <SouthEastIcon color={isDecreaseBenefit ? 'success' : 'error'} />
      }
    }
  }, [value, diffPercent, isDecreaseBenefit])

  const displayPercentChange = useMemo(() => {
    if (value !== 0) {
      return `${diffPercent}%`
    } else {
      return ''
    }
  }, [value, diffPercent])

  return (
    <Stack direction="row" sx={{ height: isLargeSize ? 125 : 112, mb: 3, position: 'relative' }}>
      <Stack>
        <CustomTooltip elementName={`label-${title.replaceAll(' ', '-').toLowerCase()}`}>
          <Typography variant="caption" color="text.secondary">
            <DataAlert elementName={`label-${title.replaceAll(' ', '-').toLowerCase()}`}>
              {title}
            </DataAlert>
          </Typography>
        </CustomTooltip>
        <Stack direction="row" alignItems="flex-end" spacing={1}>
          <Typography variant="h1" {...(isLargeSize ? emStyle : {})}>
            {displayValue}
          </Typography>
          <Stack sx={{ pb: 0.75 }}>
            {displayArrows}
            <CustomTooltip elementName="value-percent-change">
              <Typography variant="subtitle1" color={diffColor} fontWeight={700}>
                {displayPercentChange}
              </Typography>
            </CustomTooltip>
          </Stack>
