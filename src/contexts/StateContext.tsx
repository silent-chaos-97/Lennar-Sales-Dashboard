import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import { fetchRegions, fetchChartData, fetchMetrics } from './Api'
import { LeaderboardsState } from '@/types/leaderboards'
import { IscPerformanceState } from '@/types/performance'
import { CurrentActivityState } from '@/types/current_activity'
import { PacingState } from '@/types/pacing'
import { SalesState } from '@/types/sales'
import { CohortListItem, Division } from '@/types/cohort'
import { PricingState } from '@/types/pricing'
import { InsightState } from '@/types/insights'
import { MetricsState } from '@/types/metrics'
import { HTTP_STATUS_CODES } from '@/utils/constant'

interface StateContextValues {
  leaderboards?: LeaderboardsState
  performanceTimeframeState: Record<string, IscPerformanceState>
  activityTimeframeState: Record<string, CurrentActivityState>
  pacingState?: PacingState
  salesTimeframeState: Record<string, SalesState>
  pricingState?: PricingState
  insightState?: InsightState
