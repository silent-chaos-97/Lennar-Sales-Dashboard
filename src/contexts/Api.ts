import { Division } from '@/types/cohort'
import axios from 'axios'

let abortController = new AbortController()
let signal = abortController.signal

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'

export const fetchMetrics = async () => {
  try {
    const res = await axios.get(API_URL + '/api/metrics')
    return res.data
  } catch (error) {
    console.log('#### Request Error:', (error as Error).message)
  }
}

export const fetchRegions = async () => {
  try {
    const res = await axios.get(API_URL + '/api/cohorts')
    return res.data
  } catch (error) {
    console.log('#### Request Error:', (error as Error).message)
  }
}

export const fetchChartData = async (location: Division) => {
  abortController.abort()
  abortController = new AbortController()
  signal = abortController.signal

  try {
    const res = await axios.get(
