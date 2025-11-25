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
  color: string
  current_week_prediction?: number
  change_needed_to_meet_pace: number
  available_homes: AvailableHomes
  weekly_pacing_graph: WeeklyPacingItem[]
  pricing_data: PricingData
  leaderboard: LeaderboardObj[] | LeaderboardObj
}

interface SubCohortMap {
  map_summary: string
  map_title: string
  sub_cohort_array: SubCohortItem[]
}

export interface PacingState extends Cohort {
  CHANGE_NEEDED_TO_MEET_PACE: number
  CURRENT_WEEK_PREDICTION: number
  DBT_UPDATED_AT: string
  NEXT_3W_PACE: number
  PAST_3W_SALES: number
  WEEKLY_PACING_GRAPH: WeeklyPacingItem[]
  SUB_COHORT_MAP: SubCohortMap
  AVAILABLE_HOMES: AvailableHomes
}

export enum PacingBulletBarColors {
  black = '#212936',
  yellow = '#ef9628',
  green = '#009d4f',
  red = '#e44d4d',
  white = '#fff'
}
