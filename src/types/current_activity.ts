export interface TickerItem {
  activity_time: string
  activity_status: string
  sort: number
}

export interface HourlyTicker {
  prev: number
  current: number
  hour: number
}

export interface CurrentActivityState {
  APPOINTMENTS_SET: number | null
  APPOINTMENTS_SET_PERCENT_CHANGE: number | null
  TOTAL_CALLS: number | null
  TOTAL_CALLS_PERCENT_CHANGE: number | null
  TOTAL_CHATS_TEXTS: number | null
  TOTAL_CHATS_TEXTS_PERCENT_CHANGE: number | null
  COHORT: string
  COHORT_TYPE: string
  DBT_UPDATED_AT: string
  PRIOR_WEEK_APPOINTMENT_SET_TICKER_ARRAY: TickerItem[]
  CALLS_TICKER_ARRAY: TickerItem[] | null
  CHATS_TEXTS_TICKER_ARRAY: null | TickerItem[]
  LEADS_BY_CHANNEL: {
    paid: number
    paid_pct_change: number
