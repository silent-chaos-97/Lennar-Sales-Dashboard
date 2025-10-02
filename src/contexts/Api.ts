import { Division } from '@/types/cohort'
import axios from 'axios'

let abortController = new AbortController()
let signal = abortController.signal
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'

export const fetchMetrics = async () => {
  try {
