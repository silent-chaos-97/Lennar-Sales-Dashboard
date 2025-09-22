import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Section from '@/components/common/Section/Section'
import DailyAnalyticsBox from '@/components/daily-analytics-box'
import { Typography } from '@mui/material'
import { useAppState } from '@/contexts/StateContext'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CustomDailyAnalyticsBox from '@/components/custom-daily-analytics-box'
import { SALES_TIMEFRAMES, SalesState } from '@/types/sales'

const Wrapper = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  width: 648,
  zIndex: 2,
  background: 'linear-gradient(to right, #191D26, rgba(33, 42, 54, 0))',
  padding: '32px 24px'
