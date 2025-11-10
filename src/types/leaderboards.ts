export interface MemberDetailValue {
  color: string
  goal_value: number
  percent_value: number
}

export interface LeaderboardISCMemberDetail {
  appt_kept_division_rank: number
  appt_kept_national_rank: number
  appt_set_division_rank: number
  appt_set_national_rank: number
  appts_missed: number
  appts_set: number
  appts_set_percent_change: number
  sales_division_rank: number
  sales_national_rank: number
  total_calls: number
  total_calls_percent_change: number
  total_chats: number
  total_chats_percent_change: number
  total_chats_texts: number
  total_chats_texts_percent_change: number
  total_sales: number
  total_texts: number
  total_texts_percent_change: number
  leads_w_appts_set: MemberDetailValue
  trifecta: MemberDetailValue
  follow_up: MemberDetailValue
  beback_with_follow_up: MemberDetailValue
  appts_kept: MemberDetailValue
}

export interface LeaderboardNHCMemberDetail {
  appointments_kept_rate: number
  days_since_last_sale: number
  gross_sales: number
  gross_sales_division_rank: number
  gross_sales_national_rank: number
  incentive_rate: number
  net_revenue: number
  net_revenue_division_rank: number
  net_revenue_national_rank: number
  net_revenue_percent_change: number
  net_sales: number
  realtor_attachment_rate: number
  realtor_attachment_rate_division_rank: number
  realtor_attachment_rate_national_rank: number
  realtor_commission_rate: number
  graph_data: []
}

export interface LeaderboardMemberDetail
  extends LeaderboardISCMemberDetail,
    LeaderboardNHCMemberDetail {}

export interface LeaderboardItemValue {
  cohort_rank: number
  image_url: string
  name: string
  division_name: string
  national_rank: number
  summary: string
  pop_out_details?: LeaderboardMemberDetail
}

export interface LeaderboardFilterObj {
  MTD: LeaderboardItemValue[]
  QTD: LeaderboardItemValue[]
  WTD: LeaderboardItemValue[]
}

export interface LeaderboardObj {
  type: string
  values: LeaderboardItemValue[]
  appointments_kept: LeaderboardFilterObj
  bebacks_with_followup: LeaderboardFilterObj
  calls: LeaderboardFilterObj
  chats_texts: LeaderboardFilterObj
  leads_with_appointment_set: LeaderboardFilterObj
  leads_with_followup: LeaderboardFilterObj
  leads_with_trifecta: LeaderboardFilterObj
  sales: LeaderboardFilterObj
}

export interface LeaderboardsState {
  COHORT: string
  COHORT_TYPE: string
