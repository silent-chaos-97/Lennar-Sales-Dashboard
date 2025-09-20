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
