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
  const scores = {
    paid: data?.LEADS_BY_CHANNEL.paid || 0,
    non_paid: data?.LEADS_BY_CHANNEL.non_paid || 0,
    third_party: data?.LEADS_BY_CHANNEL.third_party || 0
  }

  const maxValue = useMemo(() => {
    return Math.max(...Object.values(scores))
  }, [scores])

  return (
    <Box width="100%">
