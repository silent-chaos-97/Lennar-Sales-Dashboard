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
          name: sub_region.name,
          type: sub_region.type,
          latitude: sub_region.latitude,
          longitude: sub_region.longitude,
          timezone: sub_region.timezone
        })

        if (sub_region.divisions) {
          sub_region.divisions.forEach((division) => {
            sortedCohortList.push({
              name: division.name,
              type: division.type,
              latitude: division.latitude,
              longitude: division.longitude,
              timezone: division.timezone
            })
          })
        }
      })
    }
  })

  for (let i = 0; i < sortedCohortList.length; i++) {
    console.log(
      `[${i + 1} / ${sortedCohortList.length}] Fetching Cohort Data ${
        sortedCohortList[i].name
      } is started `
    )
    const cohortData = await SnowflakeService.getCohortData(
      sortedCohortList[i].name,
      sortedCohortList[i].type
    )

    const cacheFilename = `${sanitizeFilename(
      sortedCohortList[i].name
    ).toLowerCase()}-${sanitizeFilename(sortedCohortList[i].type)}.json`
    const cacheFilePath = path.join(__dirname, '..', 'cache', cacheFilename)

    // Add a timestamp field to the result
    const timestampedResult = {
      timestamp: new Date().toISOString(),
      data: cohortData
    }
