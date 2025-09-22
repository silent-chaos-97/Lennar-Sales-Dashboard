import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'
import path from 'path'
import express, { Express } from 'express'
import cors from 'cors'

import SnowflakeService from './services/snowflake'

const app: Express = express()
