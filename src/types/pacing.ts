import { Cohort } from './cohort'
import { LeaderboardObj } from './leaderboards'
import { PriceDetailItem } from './pricing'

export interface WeeklyPacingItem {
  future_pace: number
  gross_sales: number
  x_axis: string
  sort: number
}

interface AvailableHomes {
  black_homes: number
  green_homes: number
  red_homes: number
  total_available: number
  yellow_homes: number
}

export interface PricingData {
  lennar_prices: PriceDetailItem
  new_construction_prices: PriceDetailItem
  resale_prices: PriceDetailItem
}

export interface SubCohortItem {
  latitude: number
  longitude: number
  name: string
  next_3w_pace: number
  past_3w_sales: number
  status: string
