import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Leaderboard from '@/components/wrappers/leaderboard'
import PacingStatus from '@/components/wrappers/pacing-status'
import PacingAnalysis from '@/components/wrappers/pacing-analysis'
import PricingAnalysis from '@/components/wrappers/pricing-analysis'
import { useMemo, useRef } from 'react'
import { useAppState } from '@/contexts/StateContext'
import { NHC_LEADERBOARD_CATEGORIES } from '@/types/leaderboards'

const RightPane = () => {
  const { pricingState, leaderboards } = useAppState()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const pricingData = useMemo(() => {
    return {
      lennar_prices: pricingState?.LENNAR_PRICES || {},
      new_construction_prices: pricingState?.NEW_CONSTRUCTION_PRICES || {},
      resale_prices: pricingState?.RESALE_PRICES || {}
    }
  }, [pricingState])

  return (
    <Box width={1888}>
      <Grid container spacing={8} pt={4} ref={wrapperRef} sx={{ position: 'relative' }}>
        <Grid item lg={3}>
          <PacingStatus mapWrapperRef={wrapperRef} />
        </Grid>
        <Grid item lg={9}>
          <Box>
            <Grid container spacing={8}>
              <Grid item lg={8}>
                <PacingAnalysis />
                <PricingAnalysis data={pricingData} chartId="pricing-analysis" />
