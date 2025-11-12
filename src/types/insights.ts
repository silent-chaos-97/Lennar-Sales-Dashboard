import { Cohort } from './cohort'

  color: string
  content: number
  insight_for: string
}

export interface InsightState extends Cohort {
  BOTTOM_INCENTIVE_INSIGHT: InsightItem
