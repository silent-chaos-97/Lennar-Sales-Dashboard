export interface PerformanceItem {
  color: string
  goal_value: number
  percent_value: number
  missed?: number
}

export interface IscPerformanceState {
  COHORT: string
  COHORT_TYPE: string
  DBT_UPDATED_AT: string
