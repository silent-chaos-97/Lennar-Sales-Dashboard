import { Cohort } from './cohort'

export interface SalesDetailObject {
  percent_change: number
  value: number
  graph: { x_axis: string; y_axis: number; sort: number }[]
}

export interface AssociateArrayItem {
  cohort_rank: number
