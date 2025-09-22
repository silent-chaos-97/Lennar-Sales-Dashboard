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
