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
  cohorts: Division[]
  locations: CohortListItem[]
  refreshData: (reset: boolean) => void
  currentCohort: Division
  setCurrentCohort: (value: Division) => void
  fetchNextDivision: () => void
  fetchRegionDivisions: () => void
  setPrevSelectedDivisionType: (value: string) => void
  metrics?: MetricsState
  dataStatus?: number
}

const StateContext = createContext<StateContextValues>({
  refreshData: () => null,
  cohorts: [],
  locations: [],
  currentCohort: {
    name: 'National',
    type: 'all',
    latitude: 35.86,
    longitude: -98.26,
    timezone: 'US/Eastern'
  },
  activityTimeframeState: {},
  salesTimeframeState: {},
  performanceTimeframeState: {},
  setCurrentCohort: () => null,
  fetchNextDivision: () => null,
  fetchRegionDivisions: () => null,
  setPrevSelectedDivisionType: () => null
})

export const StateProvider = (props: PropsWithChildren) => {
  const [leaderboards, setLeaderboards] = useState<LeaderboardsState | undefined>()
  const [performanceTimeframeState, setPerformanceTimeframeState] = useState<
    Record<string, IscPerformanceState>
  >({})
  const [activityTimeframeState, setActivityTimeframeState] = useState<
    Record<string, CurrentActivityState>
  >({})
  const [pacingState, setPacingState] = useState<PacingState | undefined>()
  const [salesTimeframeState, setSalesTimeframeState] = useState<Record<string, SalesState>>({})
  const [pricingState, setPricingState] = useState<PricingState | undefined>()
  const [insightState, setInsightState] = useState<InsightState | undefined>()
  const [locations, setLocations] = useState<CohortListItem[]>([])
  const [currentCohort, setCurrentCohort] = useState<Division>({
    name: 'National',
    type: 'all',
    latitude: 35.86,
    longitude: -98.26,
    timezone: 'US/Eastern'
  })
  const [subDivisions, setSubDivisions] = useState<Division[]>([])
  const [prevSelectedDivisionType, setPrevSelectedDivisionType] = useState<string>('')
  const [msd, setMsd] = useState<boolean>(false)
  const [metrics, setMetrics] = useState<MetricsState>()
  const [dataStatus, setDataStatus] = useState<number | undefined>()

  const fetchTheMetrics = async () => {
    const [m] = await fetchMetrics()
    setMetrics(m)
  }

  const fetchLocations = async () => {
    const regions = await fetchRegions()
    setLocations(regions)
  }

  const sortedCohorts = useMemo(() => {
    const cohorts = [
      {
        name: 'National',
        type: 'all',
        latitude: 35.86,
        longitude: -98.26,
        timezone: 'US/Eastern'
      }
    ]

    locations.forEach((region) => {
      cohorts.push({
        name: region.name,
        type: region.type,
        latitude: region.latitude,
        longitude: region.longitude,
        timezone: region.timezone
      })

      if (region.divisions) {
        region.divisions.forEach((sub_region) => {
          cohorts.push({
            name: sub_region.name,
            type: sub_region.type,
            latitude: sub_region.latitude,
            longitude: sub_region.longitude,
            timezone: sub_region.timezone
          })

          if (sub_region.divisions) {
            sub_region.divisions.forEach((division) => {
              cohorts.push({
                name: division.name,
                type: division.type,
                latitude: division.latitude,
                longitude: division.longitude,
                timezone: division.timezone
              })
            })
          }
        })
      }
    })

    return cohorts
  }, [locations])

  const refreshData = async (reset = true) => {
    if (reset) {
      setLeaderboards(undefined)
      setPerformanceTimeframeState({})
      setActivityTimeframeState({})
      setPacingState(undefined)
      setSalesTimeframeState({})
      setPricingState(undefined)
      setInsightState(undefined)
    }
    const response = await fetchChartData(currentCohort)
    if (response) {
      const { data, status } = response
      setLeaderboards(data.leaderboards)
      setPerformanceTimeframeState(data.isc_performance_timeframe)
      setActivityTimeframeState(data.current_activity_timeframe)
      setPacingState(data.pacing)
      setSalesTimeframeState(data.sales_timeframe)
      setPricingState(data.pricing)
      setInsightState(data.insights)
      setDataStatus(status)
    } else {
      setDataStatus(HTTP_STATUS_CODES.REQUEST_TIMEOUT)
    }
  }

  useEffect(() => {
    fetchLocations()
    fetchTheMetrics()
  }, [])

  useEffect(() => {
    refreshData()
  }, [currentCohort])

  const fetchNextDivision = () => {
    const idx = sortedCohorts.findIndex((division) => division.name === currentCohort.name)
    if (idx !== -1) {
      const nextIdx = (idx + 1) % sortedCohorts.length
      setCurrentCohort({ ...sortedCohorts[nextIdx] })
