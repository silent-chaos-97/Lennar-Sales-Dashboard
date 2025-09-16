import dotenv from 'dotenv'
dotenv.config()
import cron from 'node-cron'
import path from 'path'
import fs from 'fs'
import SnowflakeService from '../services/snowflake'
import { CohortListItem, Division } from '../types/cohort'
