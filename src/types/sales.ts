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
