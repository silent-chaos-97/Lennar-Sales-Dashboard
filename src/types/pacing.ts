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
