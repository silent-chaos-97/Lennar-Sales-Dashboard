// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import snowflake, { ConnectionOptions } from 'snowflake-sdk'
import { Cohort } from '../types/cohort'

if (
  !process.env.SNOWFLAKE_ACCOUNT ||
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
                          sub_division.REGION === rRow.REGION &&
                          sub_division.SUB_REGION === dRow.SUB_REGION
                      )
                      .map((sub_division) => ({
                        type: sub_division.COHORT_TYPE,
                        name: sub_division.COHORT,
                        latitude: sub_division.LATITUDE,
                        longitude: sub_division.LONGITUDE,
                        timezone: sub_division.TIME_ZONE
                      }))
                    return {
                      type: dRow.COHORT_TYPE,
                      name: dRow.COHORT,
                      latitude: dRow.LATITUDE,
                      longitude: dRow.LONGITUDE,
                      timezone: dRow.TIME_ZONE,
                      divisions
                    }
                  })

                return {
                  type: rRow.COHORT_TYPE,
                  name: rRow.COHORT,
                  latitude: rRow.LATITUDE,
                  longitude: rRow.LONGITUDE,
                  timezone: rRow.TIME_ZONE,
                  divisions: [...divisions, ...subRegions]
                }
              })

            connection.destroy(() => {
              console.log('Cohort Division fetching is finished')
            })

            resolve(regions)
          }
        })
      })
    })
  }

  getCohortData(cohort: string, cohort_type: string) {
    const result: Record<string, unknown> = {}
    let statIdx = 0
    const statsKeys = [
      'leaderboards',
      'isc_performance_timeframe',
      'current_activity_timeframe',
      'sales_timeframe',
      'pacing',
      'pricing',
      'insights'
    ]

    const sqls = {
      leaderboards: `select * from homebase.corp_hub_leaderboards_json WHERE COHORT = '${cohort}' AND COHORT_TYPE = '${cohort_type}';`,
      isc_performance_timeframe: `select * from homebase.corp_hub_timeframe_isc_performance_json WHERE COHORT = '${cohort}' AND COHORT_TYPE = '${cohort_type}';`,
      current_activity_timeframe: `select * from homebase.corp_hub_timeframe_current_activity_json WHERE COHORT = '${cohort}' AND COHORT_TYPE = '${cohort_type}';`,
      sales_timeframe: `select * from homebase.corp_hub_timeframe_sales_json WHERE COHORT = '${cohort}' AND COHORT_TYPE = '${cohort_type}';`,
      pacing: `select * from homebase.corp_hub_pacing_json WHERE COHORT = '${cohort}' AND COHORT_TYPE = '${cohort_type}';`,
      pricing: `select * from homebase.corp_hub_pricing_json WHERE COHORT = '${cohort}' AND COHORT_TYPE = '${cohort_type}';`,
      insights: `select * from homebase.corp_hub_insights_json WHERE COHORT = '${cohort}' AND COHORT_TYPE = '${cohort_type}';`
    }

    const sqlText = Object.values(sqls).join(' ')

    const connection = this.createConnection()

    return new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          console.error('Error connecting to Snowflake:', err)
          return reject(err)
        }

        connection.execute({
          sqlText: sqlText,
          parameters: { MULTI_STATEMENT_COUNT: 7 },
          complete: (err, stmt, rows) => {
            if (err) {
              console.error(
                '1 Failed to execute statement due to the following error: ' + err.message
              )

              return reject(err)
            }

            if ([1, 2, 3].includes(statIdx) && rows.length > 1) {
              result[statsKeys[statIdx]] = rows.reduce((acc, row) => {
                acc[row.TIMEFRAME] = row
                return acc
              }, {})
            } else if (rows.length === 1) {
              result[statsKeys[statIdx]] = rows[0]
            } else {
              result[statsKeys[statIdx]] = null
            }

            if (stmt.hasNext()) {
              statIdx++
              stmt.NextResult()
            } else {
              connection.destroy(() => {
                console.log(`Fetching Cohort Data for ${cohort} is finished`)
              })

              resolve(result)
            }
