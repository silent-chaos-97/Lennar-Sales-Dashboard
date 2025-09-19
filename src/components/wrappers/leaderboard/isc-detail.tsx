import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Section from '@/components/common/Section/Section'
import PercentValueText from '@/components/common/PercentValueText'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PerformanceBar from '@/components/charts/PerformanceBar'
import { MemberDetailValue } from '@/types/leaderboards'
import { getRandomColor, pluralize } from '@/utils/helper'
import { ResponsiveRadialBar } from '@nivo/radial-bar'
import { RadialAxisTickProps } from '@nivo/polar-axes'
import { PERFORMANCE_COLORS } from '@/utils/constant'
import { LeaderboardDetailProps } from './leaderboard-detail'
import KPIWidget from './kpi-widget'
import { useClickAway } from 'react-use'
import { useRef } from 'react'
import CustomTooltip from '@/components/common/CustomTooltip'

const AxisXStartTickComponent = (props: RadialAxisTickProps & { value: number }) => {
  const labels = {
    beback_with_follow_up: 'Be-backs with follow-up',
    follow_up: 'Leads with follow-up',
    trifecta: 'Leads with trifecta'
  }
  return (
    <CustomTooltip elementName={`label-isc-${props.label.toString().toLowerCase()}`}>
      <g transform={`translate(${props.y}, 0) rotate(${props.rotation})`}>
