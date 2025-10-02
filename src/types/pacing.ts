import { Cohort } from './cohort'
import { LeaderboardObj } from './leaderboards'

export interface WeeklyPacingItem {
  future_pace: number
  gross_sales: number
  x_axis: string
  sort: number
}

interface AvailableHomes {
  black_homes: number
