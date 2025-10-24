import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Leads from '@/components/wrappers/leads/leads'
import IscActivity from '@/components/wrappers/isc-activity'
import Leaderboard from '@/components/wrappers/leaderboard'
import Performance from '@/components/wrappers/performance'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Section from '@/components/common/Section/Section'
import { useAppState } from '@/contexts/StateContext'
import { ACTIVITY_TIMEFRAMES } from '@/types/current_activity'
import { ISC_LEADERBOARD_CATEGORIES } from '@/types/leaderboards'
import { DateTime } from 'luxon'
import { TIMEZONE } from '@/utils/constant'

const LeftPane = () => {
  const { leaderboards, activityTimeframeState, currentCohort } = useAppState()
  const [activityTimeframe, setActivityFrame] = useState('today')
  const selectedActivity = activityTimeframeState[activityTimeframe]
  const now = DateTime.local().setZone(TIMEZONE[currentCohort.timezone])
  const isBetween7and11 = now.hour >= 0 && now.hour < 11

  useEffect(() => {
    if (isBetween7and11) {
      setActivityFrame('yesterday')
    } else {
      setActivityFrame('today')
    }
  }, [isBetween7and11, activityTimeframeState])

  return (
    <Box width={1888} position="relative">
      <Grid container spacing={8} pt={4}>
        <Grid item lg={9}>
          <Section
            title="Current activity"
            more={
              <Stack direction="row" alignItems="center" spacing={1} color="text.secondary">
                <ArrowForwardIcon color="inherit" />
                <Typography variant="caption" color="text.secondary">
                  vs same day and time previous week
