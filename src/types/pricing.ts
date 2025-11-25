import { Cohort } from './cohort'

export interface PriceDetailItem {
  percentile_0?: number
  percentile_5?: number
  percentile_25?: number
  percentile_50?: number
  percentile_50_percent_change?: number
  percentile_75?: number
  percentile_95?: number
  percentile_100?: number
}

export interface PricingState extends Cohort {
  LENNAR_PRICES: PriceDetailItem
  NEW_CONSTRUCTION_PRICES: PriceDetailItem
  RESALE_PRICES: PriceDetailItem
}
