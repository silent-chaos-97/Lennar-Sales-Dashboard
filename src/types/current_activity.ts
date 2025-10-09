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
