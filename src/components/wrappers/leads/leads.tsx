import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Bar from '@/components/charts/Bar/Bar'
import HourlyActivity from '@/components/charts/hourly-activity'
import { Typography } from '@mui/material'
import { useMemo } from 'react'
import CustomTooltip from '@/components/common/CustomTooltip'
import DataAlert from '@/components/common/CustomTooltip/DataAlert'
import { CurrentActivityState } from '@/types/current_activity'

interface LeadsProps {
  activityTimeframe: string
  data: CurrentActivityState
}

const Leads = ({ data, activityTimeframe }: LeadsProps) => {
