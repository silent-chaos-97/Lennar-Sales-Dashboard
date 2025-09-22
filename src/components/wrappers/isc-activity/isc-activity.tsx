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
