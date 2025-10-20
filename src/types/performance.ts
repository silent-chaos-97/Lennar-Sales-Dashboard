export interface PerformanceItem {
  color: string
  percent_value: number
  missed?: number
}

export interface IscPerformanceState {
  COHORT: string
  COHORT_TYPE: string
  DBT_UPDATED_AT: string
  APPOINTMENTS_KEPT: PerformanceItem
