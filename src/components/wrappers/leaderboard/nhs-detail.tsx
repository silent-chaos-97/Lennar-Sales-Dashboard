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
import { getRandomColor } from '@/utils/helper'
import GrossSalesBarChart from '@/components/charts/GrossSalesChart/GrossSalesBarChart'
import { LeaderboardDetailProps } from './leaderboard-detail'
import KPIWidget from './kpi-widget'
import { useClickAway } from 'react-use'
import { useRef } from 'react'
import { pluralize } from '@/utils/helper'
import CustomTooltip from '@/components/common/CustomTooltip'

const NHSDetail = ({
  open,
  name,
  onPrev,
  onNext,
  onClose,
  data,
  imageUrl,
  cohortRank,
  nationalRank,
  disablePrevNext,
  activeTimestamp
}: LeaderboardDetailProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  useClickAway(wrapperRef, () => onClose())

  return (
    <Fade in={open}>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 60,
          bottom: 0,
          right: 0,
          bgcolor: 'rgba(33,41,54,0.67)',
          zIndex: 3
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
              timestamp={activeTimestamp}
              more={
                <Stack direction="row" alignItems="center" spacing={1} color="text.secondary">
                  <ArrowForwardIcon color="inherit" />
                  <Typography variant="caption" color="text.secondary">
                    vs same point last period
                  </Typography>
                </Stack>
              }
            >
              <Grid container>
                <Grid item xs={2.5}>
                  <Stack direction="row" spacing={1.5} alignItems="center" py={2}>
                    <Stack alignItems="center" sx={{ width: 44 }}>
                      <Typography variant="h4" fontWeight={700} color="#A5CFEF">
                        {cohortRank}
                      </Typography>
                      <Typography variant="body1" color="#A5CFEF">
                        {nationalRank}
