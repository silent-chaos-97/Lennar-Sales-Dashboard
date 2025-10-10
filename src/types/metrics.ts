export enum DataStatus {
  issue = 'issue',
  upToDate = 'up-to-date'
}
export interface Metric {
  data_status: DataStatus
