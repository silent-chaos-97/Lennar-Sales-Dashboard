import CustomTooltip from '@/components/common/CustomTooltip'
import DataAlert from '@/components/common/CustomTooltip/DataAlert'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import SouthEastIcon from '@mui/icons-material/SouthEast'
import NorthEastIcon from '@mui/icons-material/NorthEast'
import LineChart from '@/components/charts/LineChart'
import { HourlyTicker } from '@/types/current_activity'
import { getValueChangeTextColor } from '@/utils/helper'

interface HourlyActivityProps {
  title: string
  tickers: HourlyTicker[]
  total: number
  change: number
  activityTimeframe: string
}

const HourlyActivity = ({
  title,
  tickers,
  total,
  change,
  activityTimeframe
}: HourlyActivityProps) => {
  const id = title
    .toLowerCase()
    .replaceAll(' ', '-')
    .replace(/[^a-zA-Z-]/g, '')

  return (
    <Box sx={{ mb: 2 }}>
      <CustomTooltip elementName={`label-${id}`}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
          <DataAlert elementName={`label-${id}`} truncateSize={20}>
            {title}
          </DataAlert>
        </Typography>
      </CustomTooltip>
      <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.18)', mb: 2 }}>
        <LineChart
          id={id}
          data={tickers}
          width={210}
          showCurrentFully={activityTimeframe !== 'today'}
        />
      </Box>
