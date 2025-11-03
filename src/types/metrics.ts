export enum DataStatus {
  issue = 'issue',
  upToDate = 'up-to-date'
}
export interface Metric {
  data_status: DataStatus
  element_name: string
  hover_element: string
  kpi: string
  pane: string
