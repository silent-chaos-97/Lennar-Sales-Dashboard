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
}: CustomDailyAnalyticsBoxProps) => {
  const diffColor = useMemo(() => {
    if (diffPercent === 0) return 'text.primary'
    else if (diffPercent > 0) return isDecreaseBenefit ? 'error' : 'success.main'
    return isDecreaseBenefit ? 'success.main' : 'error'
  }, [diffPercent, isDecreaseBenefit])

  return (
    <Stack direction="row" sx={{ height: 15, mb: 5 }} alignItems="flex-end" spacing={1}>
      <Typography variant="caption">
        {unit !== '%' ? `${unit}${value.toLocaleString()} ${title}` : `${value}${unit}`}
      </Typography>
      {diffPercent !== 0 &&
        (diffPercent > 0 ? (
          <NorthEastIcon color={isDecreaseBenefit ? 'error' : 'success'} />
        ) : (
          <SouthEastIcon color={isDecreaseBenefit ? 'success' : 'error'} />
        ))}
      <Typography variant="caption" color={diffColor} fontWeight={700}>
        {diffPercent !== 0 ? `${diffPercent}%` : ''}
      </Typography>
    </Stack>
  )
}

export default CustomDailyAnalyticsBox
