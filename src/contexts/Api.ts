import { Division } from '@/types/cohort'
import axios from 'axios'

let abortController = new AbortController()

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'

export const fetchMetrics = async () => {
  try {
    const res = await axios.get(API_URL + '/api/metrics')
