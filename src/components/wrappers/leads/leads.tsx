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
      <Stack direction="row" spacing={4}>
        <HourlyActivity
          title="Web visitors"
          tickers={data?.HOURLY_WEB_VISITORS_ARRAY || []}
          total={data?.WEB_VISITORS || 0}
          change={data?.WEB_VISITORS_PERCENT_CHANGE || 0}
          activityTimeframe={activityTimeframe}
        />
        <HourlyActivity
          title="Total leads"
          tickers={data?.HOURLY_LEADS_ARRAY || []}
          total={data?.LEADS || 0}
          change={data?.LEADS_PERCENT_CHANGE || 0}
          activityTimeframe={activityTimeframe}
        />
      </Stack>
      <Stack spacing={0.5} sx={{ width: '100%' }}>
        <CustomTooltip elementName="label-leads-by-channel">
          <Typography variant="caption" color="text.secondary">
            <DataAlert elementName="label-leads-by-channel">Leads by source</DataAlert>
          </Typography>
        </CustomTooltip>

        <Bar
          label="Paid"
          color="#005daa"
          percent={(scores.paid / maxValue) * 100}
          value={scores.paid}
          change={data?.LEADS_BY_CHANNEL.paid_pct_change || 0}
        <Bar
