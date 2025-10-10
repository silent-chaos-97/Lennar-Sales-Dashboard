// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import snowflake, { ConnectionOptions } from 'snowflake-sdk'
import { Cohort } from '../types/cohort'

if (
  !process.env.SNOWFLAKE_USERNAME ||
  !process.env.SNOWFLAKE_PASSWORD ||
  !process.env.SNOWFLAKE_ROLE ||
  !process.env.SNOWFLAKE_WAREHOUSE ||
  !process.env.SNOWFLAKE_DATABASE ||
  !process.env.SNOWFLAKE_DMT
) {
  console.error('Please set the env vars properly!')
  process.exit(1)
}

const snowflakeOptions: ConnectionOptions = {
  account: process.env.SNOWFLAKE_ACCOUNT,
  username: process.env.SNOWFLAKE_USERNAME,
  password: process.env.SNOWFLAKE_PASSWORD,
  role: process.env.SNOWFLAKE_ROLE,
  warehouse: process.env.SNOWFLAKE_WAREHOUSE,
  database: process.env.SNOWFLAKE_DATABASE,
  schema: process.env.SNOWFLAKE_DMT
}

class SnowflakeService {
  createConnection() {
    return snowflake.createConnection(snowflakeOptions)
  }

  getCohortList(): Promise<CohortListItem[]> {
    const sql = 'select * from homebase.corp_hub_cohorts_json'
    const connection = this.createConnection()

    return new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          console.error('Error connecting to Snowflake:', err)
          return reject(err)
        }

        connection.execute({
          sqlText: sql,
          complete: (err, stmt, rows?: Cohort[]) => {
            if (err || !rows) {
              console.error('Error executing Snowflake query:', err)
              return reject(err)
            }
            const regions = rows
              .filter((rRow) => rRow.COHORT_TYPE === 'region')
              .map((rRow) => {
                const divisions = rows
                  .filter(
                    (dRow) =>
                      dRow.COHORT_TYPE === 'division' &&
                      dRow.REGION === rRow.REGION &&
                      !dRow.SUB_REGION
                  )
                  .map((dRow) => ({
                    type: dRow.COHORT_TYPE,
                    name: dRow.COHORT,
                    latitude: dRow.LATITUDE,
                    longitude: dRow.LONGITUDE,
                    timezone: dRow.TIME_ZONE
                  }))

                const subRegions = rows
                  .filter(
                    (dRow) => dRow.COHORT_TYPE === 'sub_region' && dRow.REGION === rRow.REGION
                  )
                  .map((dRow) => {
                    const divisions = rows
                      .filter(
                        (sub_division) =>
                          sub_division.COHORT_TYPE === 'division' &&
