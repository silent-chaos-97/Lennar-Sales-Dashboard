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
        <text
          dx={props.textX}
          dy={-24}
          textAnchor={props.textAnchor}
          fill="#fff"
          fillOpacity="0.67"
          fontSize={16}
          fontFamily="mabry-pro"
        >
          {labels[props.label]}
        </text>
        <text
          dx={props.textX}
          textAnchor={props.textAnchor}
          dy={22}
          fontSize={56}
          fontWeight={500}
          fill="#A5CFEF"
          fontFamily="mabry-pro"
        >
          {props.value.toFixed()}%
        </text>
      </g>
    </CustomTooltip>
  )
}

const AxisXEndTickComponent = (props: RadialAxisTickProps & { goal: number }) => {
  return (
    <g transform={`translate(${props.y}, 0) rotate(180)`}>
      <text
        dx={-12}
        dy={-12}
        textAnchor={props.textAnchor}
        fill="#fff"
        fillOpacity="0.67"
        fontSize={16}
        fontFamily="mabry-pro"
      >
        {props.goal}%
      </text>
    </g>
  )
}

const ISCDetail = ({
  open,
  name,
  onPrev,
  onNext,
  onClose,
  data,
  imageUrl,
  cohortRank,
  nationalRank,
  disablePrevNext
}: LeaderboardDetailProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  useClickAway(wrapperRef, () => onClose())

  const radialData = useMemo(() => {
    return [
      {
        id: 'beback_with_follow_up',
        data: [
          {
            x: 'Be-backs with follow-up',
            y: Math.min(
              ((data?.beback_with_follow_up.percent_value || 0) /
                (data?.beback_with_follow_up.goal_value || 100)) *
                100,
              100
            )
          }
        ]
      },
      {
        id: 'follow_up',
        data: [
          {
            x: 'Leads with follow-up',
            y: Math.min(
              100,
              ((data?.follow_up.percent_value || 0) / (data?.follow_up.goal_value || 100)) * 100
            )
          }
        ]
      },
      {
        id: 'trifecta',
        data: [
          {
            x: 'Leads with trifecta',
            y: Math.min(
              ((data?.trifecta.percent_value || 0) / (data?.trifecta.goal_value || 100)) * 100,
              100
            )
          }
        ]
      }
    ]
  }, [data])

  return (
    <Fade in={open}>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          bgcolor: 'rgba(33,41,54,0.67)'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 1420,
            bgcolor: 'background.paper',
            boxShadow: 24,
            px: 3,
            py: 2.5,
            borderRadius: 2
          }}
          ref={wrapperRef}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h3" fontWeight={700}>
              {name}
            </Typography>
            <Stack direction="row">
              <IconButton onClick={onPrev}>
                <ChevronLeftIcon htmlColor="#dde3f6" opacity={disablePrevNext[0] ? 0.25 : 1} />
              </IconButton>
              <IconButton onClick={onNext}>
                <ChevronRightIcon htmlColor="#dde3f6" opacity={disablePrevNext[1] ? 0.25 : 1} />
              </IconButton>
              <IconButton size="large" onClick={onClose}>
                <CloseIcon htmlColor="#dde3f6" />
              </IconButton>
            </Stack>
          </Stack>
          <Box sx={{ mb: 5 }}>
            <Section
              title="Activity"
              timestamp="Today"
              more={
                <Stack direction="row" alignItems="center" spacing={1} color="text.secondary">
                  <ArrowForwardIcon color="inherit" />
                  <Typography variant="caption" color="text.secondary">
                    vs same day and time last week
                  </Typography>
                </Stack>
              }
            >
              <Grid container>
                <Grid item xs={2}>
                  <Stack direction="row" spacing={1.5} alignItems="center" py={2}>
                    <Stack alignItems="center" sx={{ width: 44 }}>
                      <Typography variant="h4" fontWeight={700} color="#A5CFEF">
                        {cohortRank}
                      </Typography>
                      <Typography variant="body1" color="#A5CFEF">
                        {nationalRank}
                      </Typography>
                    </Stack>
                    <Avatar
                      sx={{
                        width: 96,
                        height: 96,
                        bgcolor: getRandomColor(name),
                        color: 'primary.contrastText'
                      }}
                      imgProps={{ width: 300, height: 300 }}
                      alt={name}
                      src={imageUrl}
                    >
                      <Typography fontSize={28} fontWeight={700}>
                        {name.split(' ')[0][0] + name.split(' ')[1][0]}
                      </Typography>
                    </Avatar>
                  </Stack>
                </Grid>
                <Grid item xs={2}>
                  <CustomTooltip elementName={`label-isc-calls`}>
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      {pluralize('Call', data?.total_calls || 0)}
                    </Typography>
                  </CustomTooltip>
                  <PercentValueText
                    value={data?.total_calls || 0}
                    change={data?.total_calls_percent_change || 0}
                  />
                </Grid>
                <Grid item xs={3}>
                  <CustomTooltip elementName={`label-isc-chats-texts`}>
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      {pluralize('Chat', data?.total_chats_texts || 0)} and{' '}
                      {pluralize('text', data?.total_chats_texts || 0)}
                    </Typography>
                  </CustomTooltip>
                  <PercentValueText
                    value={data?.total_chats_texts || 0}
                    change={data?.total_chats_texts_percent_change || 0}
                  />
                </Grid>
                <Grid item xs={3}>
                  <CustomTooltip elementName={`label-isc-appts-set`}>
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      {pluralize('Appointment', data?.appts_set || 0)} set
                    </Typography>
                  </CustomTooltip>
                  <PercentValueText
                    value={data?.appts_set || 0}
                    change={data?.appts_set_percent_change || 0}
                  />
                </Grid>
                {/* <Grid item xs={3}>
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                First-time NHC visits
              </Typography>
              <PercentValueText
                value={data?.appts_set || 0}
                change={data?.appts_set_percent_change || 0}
                hideChange
              />
            </Grid> */}
                <Grid item xs={2}>
                  <CustomTooltip elementName={`label-isc-sales`}>
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
