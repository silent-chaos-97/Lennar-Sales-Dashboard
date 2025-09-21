import dotenv from 'dotenv'
dotenv.config()
import cron from 'node-cron'
import fs from 'fs'
import SnowflakeService from '../services/snowflake'
import { CohortListItem, Division } from '../types/cohort'

const CACHE_DIRECTORY = path.join(__dirname, '..', 'cache')

// Create the cache directory if it doesn't exist
if (!fs.existsSync(CACHE_DIRECTORY)) {
  fs.mkdirSync(CACHE_DIRECTORY)
}
