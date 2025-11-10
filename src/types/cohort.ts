export interface Cohort {
  COHORT: string
  COHORT_TYPE: string
  REGION: string | null
  DBT_UPDATED_AT?: string
}

export interface Division {
  type: string
  name: string
  latitude: number
  longitude: number
  timezone: string
}

export interface SubRegion extends Division {
