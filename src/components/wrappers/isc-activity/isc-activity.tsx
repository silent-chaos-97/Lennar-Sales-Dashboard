import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import ActivityChart from '@/components/charts/ActivityChart'
import AppointmentSet from '@/components/charts/AppointmentSet'
import { getValueChangeTextColor } from '@/utils/helper'
import SouthEastIcon from '@mui/icons-material/SouthEast'
import NorthEastIcon from '@mui/icons-material/NorthEast'
import DataAlert from '@/components/common/CustomTooltip/DataAlert'
import CustomTooltip from '@/components/common/CustomTooltip'
import { CurrentActivityState } from '@/types/current_activity'

interface IscActivityProps {
  data: CurrentActivityState
  activityTimeframe: string
}

const IscActivity = ({ data, activityTimeframe }: IscActivityProps) => {
  return (
    <Box>
      <Stack direction="row" gap={2} mb={6}>
        <Stack sx={{ width: 160 }}>
          <CustomTooltip elementName="label-activity-calls">
            <Typography
              variant="body1"
              fontWeight={700}
              mb={-1.5}
              color="rgba(255, 255, 255, 0.67)"
            >
              <DataAlert elementName="label-activity-calls">Calls</DataAlert>
            </Typography>
          </CustomTooltip>
          <Stack direction="row" alignItems="flex-end" spacing={1}>
            <Typography variant="h1">{(data?.TOTAL_CALLS || 0).toLocaleString()}</Typography>
            <Stack sx={{ pb: 0.75 }}>
              {(data?.TOTAL_CALLS_PERCENT_CHANGE || 0) !== 0 &&
                ((data?.TOTAL_CALLS_PERCENT_CHANGE || 0) > 0 ? (
                  <NorthEastIcon color="success" />
