import { Cohort } from './cohort'
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
