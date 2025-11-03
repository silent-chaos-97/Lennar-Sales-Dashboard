export enum DataStatus {
  issue = 'issue',
  upToDate = 'up-to-date'
}
export interface Metric {
  data_status: DataStatus
  definition_tooltip: string
  element_name: string
  hover_element: string
  kpi: string
  pane: string
