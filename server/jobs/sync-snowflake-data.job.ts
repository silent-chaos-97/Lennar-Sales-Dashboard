import dotenv from 'dotenv'
dotenv.config()
import cron from 'node-cron'
import path from 'path'
import fs from 'fs'
import SnowflakeService from '../services/snowflake'

const CACHE_DIRECTORY = path.join(__dirname, '..', 'cache')

// Create the cache directory if it doesn't exist
