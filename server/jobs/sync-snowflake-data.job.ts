import dotenv from 'dotenv'
import cron from 'node-cron'
import path from 'path'
import fs from 'fs'
import SnowflakeService from '../services/snowflake'
import { CohortListItem, Division } from '../types/cohort'

const CACHE_DIRECTORY = path.join(__dirname, '..', 'cache')
