import { Cohort } from './cohort'

export interface InsightItem {
  color: string
  content: number
  insight_for: string
}

export interface InsightState extends Cohort {
  BOTTOM_INCENTIVE_INSIGHT: InsightItem
  BOTTOM_SALES_INSIGHT: InsightItem
