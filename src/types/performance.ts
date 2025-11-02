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
  APPOINTMENTS_KEPT: PerformanceItem
  BEBACKS_WITH_FOLLOWUP: PerformanceItem
  INBOUND_CALLS_ANSWERED: PerformanceItem
  INBOUND_CHATS_ANSWERED: PerformanceItem
  LEADS_WITH_APPOINTMENT_SET: PerformanceItem
  LEADS_WITH_FOLLOWUP: PerformanceItem
