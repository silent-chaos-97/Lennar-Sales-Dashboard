import dotenv from 'dotenv'
dotenv.config()
import cron from 'node-cron'
import path from 'path'
import fs from 'fs'
import SnowflakeService from '../services/snowflake'
import { CohortListItem, Division } from '../types/cohort'

const CACHE_DIRECTORY = path.join(__dirname, '..', 'cache')

// Create the cache directory if it doesn't exist
if (!fs.existsSync(CACHE_DIRECTORY)) {
  fs.mkdirSync(CACHE_DIRECTORY)
}

function sanitizeFilename(filename: string) {
  // Replace unsafe characters with underscores
  return filename.replace(/[^a-zA-Z0-9-_]/g, '_')
}

const run = async () => {
  const cohortList = await SnowflakeService.getCohortList()

  const sortedCohortList: Division[] = [
    {
      name: 'National',
      type: 'all',
      latitude: 35.86,
      longitude: -98.26,
      timezone: 'US/Eastern'
    }
  ]

  cohortList.forEach((region: CohortListItem) => {
    sortedCohortList.push({
      name: region.name,
      type: region.type,
      latitude: region.latitude,
      longitude: region.longitude,
      timezone: region.timezone
    })

    if (region.divisions) {
      region.divisions.forEach((sub_region) => {
        sortedCohortList.push({
