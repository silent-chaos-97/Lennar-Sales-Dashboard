import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import { useAppState } from '@/contexts/StateContext'
import { Division } from '@/types/cohort'
import SelectMenuItem from './SelectMenuItem'

const NATIONAL_DIVISION = {
  name: 'National',
  type: 'all',
  latitude: 35.86,
  longitude: -98.26,
  timezone: 'US/Eastern'
