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
