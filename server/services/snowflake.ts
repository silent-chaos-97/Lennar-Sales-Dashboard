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
