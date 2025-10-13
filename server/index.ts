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

