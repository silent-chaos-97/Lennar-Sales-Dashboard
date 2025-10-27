import { Cohort } from './cohort'

export interface SalesDetailObject {
  percent_change: number
  value: number
  graph: { x_axis: string; y_axis: number; sort: number }[]
}

export interface AssociateArrayItem {
  cohort_rank: number
  image_url: string
  name: string
  national_rank: string
  summary: string
  type: string
}

export interface JourneyArrayItem {
  activity_date: string
  activity_type: string
  actor_type: string
  body: string
  sort: number
  title: string
}

export interface SalesItem {
  bed_bath: string
  days_from_completion: string
  home_size: string
  homesite_image_url: string
  incentive_percent: string
  key_attribute: string
  lot_size: string
  home_type: string
  price_vs_model_avg: number
  realtor_commission: number
  sale_price: number
  sale_title: string
  web_content_score: number
  associate_array: AssociateArrayItem[]
  sale_cohort_rank: number
}

export interface DetailSalesItems {
  type: string
  id: number
