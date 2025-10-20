import Stack from '@mui/material/Stack'
import Section from '@/components/common/Section'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IndicatorBarChart from '@/components/charts/IndicatorBarChart/IndicatorBarChart'
import { WeeklyPacingItem } from '@/types/pacing'
import { useAppState } from '@/contexts/StateContext'

interface SubPacingAnalysisProps {
  weeklyData: WeeklyPacingItem[]
  next3WPace: number
  past3WSales: number
  changeNeeded: number
  currentWeekPrediction: number
}

const SubPacingAnalysis = ({
  weeklyData,
  next3WPace,
  past3WSales,
  changeNeeded,
  currentWeekPrediction
}: SubPacingAnalysisProps) => {
  const { currentCohort } = useAppState()

  return (
    <Section
      title="Pacing Analysis"
      timestamp="WTD"
      more={
        currentCohort?.type !== 'division' && (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Box width={24} height={4} borderRadius={2} bgcolor="#1ABB96" />
            <Typography variant="caption" color="textSecondary">
              Prediction
            </Typography>
          </Stack>
        )
