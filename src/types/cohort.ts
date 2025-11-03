export interface Cohort {
  COHORT: string
  COHORT_TYPE: string
  REGION: string | null
  DBT_UPDATED_AT?: string
}

export interface Division {
  type: string
  latitude: number
  longitude: number
  timezone: string
}

