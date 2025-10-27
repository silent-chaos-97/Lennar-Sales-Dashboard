export enum DataStatus {
  issue = 'issue',
}
export interface Metric {
  data_status: DataStatus
  definition_tooltip: string
  element_name: string
  hover_element: string
