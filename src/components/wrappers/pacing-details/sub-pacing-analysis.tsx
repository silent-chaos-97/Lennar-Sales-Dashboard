import Stack from '@mui/material/Stack'
import Section from '@/components/common/Section'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { WeeklyPacingItem } from '@/types/pacing'
import { useAppState } from '@/contexts/StateContext'

interface SubPacingAnalysisProps {
  weeklyData: WeeklyPacingItem[]
  next3WPace: number
  past3WSales: number
