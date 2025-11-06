import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'
import path from 'path'
import express, { Express } from 'express'
import cors from 'cors'

import SnowflakeService from './services/snowflake'

const app: Express = express()
const port = process.env.PORT

app.use(cors())
app.get('/api/cohorts', async (req, res) => {
  const result = await SnowflakeService.getCohortList()

  res.json(result)
})

app.get('/api/metrics', async (req, res) => {
  const result = await SnowflakeService.getMetrics()

  res.json(result)
})

const CACHE_DIRECTORY = path.join(__dirname, 'cache')

// Create the cache directory if it doesn't exist
if (!fs.existsSync(CACHE_DIRECTORY)) {
  fs.mkdirSync(CACHE_DIRECTORY)
}

function sanitizeFilename(filename: string) {
  // Replace unsafe characters with underscores
  return filename.replace(/[^a-zA-Z0-9-_]/g, '_')
}

app.get('/api/data', async (req, res) => {
  const { cohort, cohort_type } = req.query

  // Sanitize and validate input values
  const sanitizedCohort = sanitizeFilename(cohort as string)
  const sanitizedCohortType = sanitizeFilename(cohort_type as string)

  const cacheFilename = `${sanitizedCohort.toLowerCase()}-${sanitizedCohortType}.json`
  const cacheFilePath = path.join(__dirname, 'cache', cacheFilename)

  if (fs.existsSync(cacheFilePath)) {
    try {
      console.log('## Date is fetched from cache: ', cacheFilePath)
      const fileContents = fs.readFileSync(cacheFilePath, 'utf8')
      const cachedData = JSON.parse(fileContents)

      // Return the cached data
      res.json(cachedData.data)
      return
    } catch (error) {
      console.error('Error reading cache file:', error)
    }
  }

  console.log(`Fetching data from snowflake`)

  const result = await SnowflakeService.getCohortData(cohort as string, cohort_type as string)
  const timestampedResult = {
    timestamp: new Date().toISOString(),
    data: result
  }

  try {
    fs.writeFileSync(cacheFilePath, JSON.stringify(timestampedResult, null, 2))
